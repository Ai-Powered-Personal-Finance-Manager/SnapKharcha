// import transporter from "../config/nodemailer.js";

// export const sendWelcomeEmail = async (toEmail, name) => {
//     await transporter.sendMail({
//         from: `"SnapKharcha" <${process.env.GMAIL_USER}>`,
//         to: toEmail,
//         subject: "Welcome to Snapkharcha!",
//         html: `
//         <h2>Welcome, ${name}! 🎉</h2>
//         <p>Thank you for registering on SnapKharcha.</p>
//         <p>Your account has been created successfully.</p>
//         <br/>
//         <p>If you did not create this account, please ignore this email.</p>
//         `,
//     });
// };

import transporter from "../config/nodemailer.js";

export const sendWelcomeEmail = async (toEmail, name) => {
    await transporter.sendMail({
        from: `"SnapKharcha" <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: "Welcome to SnapKharcha! 🎉",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Welcome to SnapKharcha</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f9fafb;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">

            <!-- Wrapper -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #bbf7d0;">

                            <!-- Header -->
                            <tr>
                                <td style="background-color:#01271E;padding:32px 40px;text-align:center;">
                                    <h1 style="margin:0;color:#00C950;font-size:28px;font-weight:700;letter-spacing:1px;">SnapKharcha</h1>
                                    <p style="margin:6px 0 0;color:#bbf7d0;font-size:13px;letter-spacing:0.5px;">Ai-Powered Personal Finance Manager</p>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 40px 24px;">
                                    <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Welcome, ${name}! 🎉</h2>
                                    <p style="margin:0 0 16px;color:#6b7280;font-size:15px;line-height:1.6;">
                                        Thank you for joining <strong style="color:#111827;">SnapKharcha</strong>. Your account has been created successfully. We're excited to help you take control of your finances.
                                    </p>
                                    <p style="margin:0 0 28px;color:#6b7280;font-size:15px;line-height:1.6;">
                                        Start tracking your expenses, setting budgets, and reaching your financial goals — all in one place.
                                    </p>

                                    <!-- CTA Button -->
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="background-color:#00C950;border-radius:8px;">
                                                <a href="${process.env.CLIENT_URL}" 
                                                   style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
                                                    Get Started →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                                <td style="padding:0 40px;">
                                    <hr style="border:none;border-top:1px solid #bbf7d0;margin:8px 0;" />
                                </td>
                            </tr>

                            <!-- Features -->
                            <tr>
                                <td style="padding:24px 40px;">
                                    <p style="margin:0 0 16px;color:#111827;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">What you can do with SnapKharcha</p>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td width="33%" style="text-align:center;padding:16px 8px;background-color:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
                                                <p style="margin:0;font-size:20px;">📊</p>
                                                <p style="margin:6px 0 0;color:#111827;font-size:13px;font-weight:600;">Track Expenses</p>
                                            </td>
                                            <td width="4%"></td>
                                            <td width="33%" style="text-align:center;padding:16px 8px;background-color:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
                                                <p style="margin:0;font-size:20px;">💰</p>
                                                <p style="margin:6px 0 0;color:#111827;font-size:13px;font-weight:600;">Set Budgets</p>
                                            </td>
                                            <td width="4%"></td>
                                            <td width="33%" style="text-align:center;padding:16px 8px;background-color:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
                                                <p style="margin:0;font-size:20px;">🎯</p>
                                                <p style="margin:6px 0 0;color:#111827;font-size:13px;font-weight:600;">Reach Goals</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                                <td style="padding:0 40px;">
                                    <hr style="border:none;border-top:1px solid #bbf7d0;margin:8px 0;" />
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding:24px 40px 32px;text-align:center;">
                                    <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">
                                        If you did not create this account, you can safely ignore this email.
                                    </p>
                                    <p style="margin:0;color:#6b7280;font-size:12px;">
                                        © ${new Date().getFullYear()} SnapKharcha. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>

        </body>
        </html>
        `,
    });
};