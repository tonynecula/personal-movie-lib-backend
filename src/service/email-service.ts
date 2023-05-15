import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
export class EmailService {
  public async sendForgotPasswordEmail(
    email: string,
    token: string
  ): Promise<SMTPTransport.SentMessageInfo> {
    const testAccount = await nodemailer.createTestAccount();
    const resetPasswordUrl = `http://localhost:8080/reset-password/?token=${token}`;
    // create a nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fbf93c28776c55",
        pass: "0a8a6ea7bca3e4",
      },
    });

    // send mail with defined transport object
    const mail = await transporter.sendMail({
      from: "antnecula@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Click the following link to reset your password:</p>
        <p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>
      `,
    });

    return mail;
  }
  public async sendWelcomeNewUser(
    email: string
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fbf93c28776c55",
        pass: "0a8a6ea7bca3e4",
      },
    });

    // send mail with defined transport object
    const mail = await transporter.sendMail({
      from: "antnecula@gmail.com",
      to: email,
      subject: "Welcome to our app!",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Welcome to our app!</title>
      </head>
      <body>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                  <td>
                      <h1>Welcome to our app!</h1>
                      <p>Hi there,</p>
                      <p>Thank you for creating an account with us. We're thrilled to have you on board!</p>
                      <p>You can now access all the features of our app and start exploring. If you have any questions or concerns, feel free to contact our support team.</p>
                      <p>Thanks again for joining us, and we look forward to seeing you around!</p>
                      <p>Best regards,</p>
                      <p>The Tony Movies Team</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `,
    });
    return mail;
  }
}
