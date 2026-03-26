import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './prisma.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists with this googleId
        let user = await prisma.user.findUnique({
            where: { googleId: profile.id }
        });

        if (user) {
            // User exists, just return them
            return done(null, user);
        }

        // Check if user exists with same email (registered normally before)
        const existingUser = await prisma.user.findUnique({
            where: { email: profile.emails[0].value }
        });

        if (existingUser) {
            // Link Google account to existing account
            user = await prisma.user.update({
                where: { email: profile.emails[0].value },
                data: { googleId: profile.id, avatar: profile.photos[0].value }
            });
            return done(null, user);
        }

        // New user — create account
        user = await prisma.user.create({
            data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatar: profile.photos[0].value,
            }
        });

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Only needed for session-based auth (we'll use JWT so these are minimal)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
});

export default passport;