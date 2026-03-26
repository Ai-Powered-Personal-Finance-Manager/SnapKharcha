// // utils/sendOtpEmail.js
// import transporter from "../config/nodemailer.js";

// export const sendOtpEmail = async (toEmail, otp) => {
//     await transporter.sendMail({
//         from: `"SnapKharcha" <${process.env.GMAIL_USER}>`,
//         to: toEmail,
//         subject: "Password Reset OTP",
//         html: `
//         <h2>Password Reset</h2>
//         <p>Your OTP is: <strong>${otp}</strong></p>
//         <p>This OTP expires in 10 minutes.</p>
//         `,
//     });
// };

import transporter from "../config/nodemailer.js";

export const sendOtpEmail = async (toEmail, otp) => {
    await transporter.sendMail({
        from: `"SnapKharcha" <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: "Your OTP for Password Reset – SnapKharcha",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Password Reset OTP</title>
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
                                    <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Password Reset Request</h2>
                                    <p style="margin:0 0 28px;color:#6b7280;font-size:15px;line-height:1.6;">
                                        We received a request to reset your SnapKharcha account password. Use the OTP below to proceed. This code is valid for <strong style="color:#111827;">10 minutes</strong>.
                                    </p>

                                    <!-- OTP Box -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="background-color:#f0fdf4;border:2px dashed #00C950;border-radius:12px;padding:28px;text-align:center;">
                                                <p style="margin:0 0 8px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your One-Time Password</p>
                                                <p style="margin:0;color:#01271E;font-size:42px;font-weight:700;letter-spacing:12px;">${otp}</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">
                                        Enter this OTP on the password reset page to continue. Do not share this code with anyone.
                                    </p>
                                </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                                <td style="padding:0 40px;">
                                    <hr style="border:none;border-top:1px solid #bbf7d0;margin:8px 0;" />
                                </td>
                            </tr>

                            <!-- Warning -->
                            <tr>
                                <td style="padding:24px 40px;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="background-color:#f0fdf4;border-left:4px solid #00C950;border-radius:0 8px 8px 0;padding:16px 20px;">
                                                <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">⚠️ Didn't request this?</p>
                                                <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                                                    If you didn't request a password reset, please ignore this email. Your account is safe and no changes have been made.
                                                </p>
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
                                        This is an automated email, please do not reply.
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