import prisma from "../config/prisma.js";

export const getProfile = async (req, res, next) => {
    /* #swagger.tags = ['Profile'] */
    try {
        const userId = req.user.id;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                dob: true,
                city: true,
                country: true,
                state: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!profile) {
            // If profile doesn't exist, create a minimal profile using available user info
            const created = await prisma.profile.create({
                data: {
                    userId,
                    name: req.user?.name || "",
                    email: req.user?.email || "",
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    phone: true,
                    dob: true,
                    city: true,
                    country: true,
                    state: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return res.status(201).json({
                success: true,
                data: {
                    id: created.id,
                    name: created.name,
                    email: created.email,
                    image: created.image,
                    phone: created.phone,
                    dob: created.dob ? created.dob.toISOString() : null,
                    city: created.city,
                    country: created.country,
                    state: created.state,
                    createdAt: created.createdAt.toISOString(),
                    updatedAt: created.updatedAt.toISOString(),
                },
                message: "Profile created",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.image,
                phone: profile.phone,
                dob: profile.dob ? profile.dob.toISOString() : null,
                city: profile.city,
                country: profile.country,
                state: profile.state,
                updatedAt: profile.updatedAt.toISOString(),
                createdAt: profile.createdAt.toISOString(),
            }
        });
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    /* #swagger.tags = ['Profile'] */
    try {
        const { name, phone, dob, city, country, state } = req.body;
        const userId = req.user.id;

        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: {
                name: name || undefined,
                phone: phone || undefined,
                dob: dob ? new Date(dob) : null,
                city: city || undefined,
                country: country || undefined,
                state: state || undefined,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                id: updatedProfile.id,
                name: updatedProfile.name,
                email: updatedProfile.email,
                image: updatedProfile.image,
                phone: updatedProfile.phone,
                dob: updatedProfile.dob ? updatedProfile.dob.toISOString() : null,
                city: updatedProfile.city,
                country: updatedProfile.country,
                state: updatedProfile.state,
                updatedAt: updatedProfile.updatedAt.toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
}