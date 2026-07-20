import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "1",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "allysaleh126@gmail.com",
      subject: `New Message from ${name} — ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0B0B0D;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B0B0D;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px;text-align:center;">
              <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;letter-spacing:3px;color:#FAFAFA;text-transform:uppercase;">Ally Saleh</h1>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;">New Contact Message</p>
            </td>
          </tr>
          <tr>
            <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent);"></td>
          </tr>
          <!-- Sender Info -->
          <tr>
            <td style="padding:30px 40px 10px;">
              <p style="margin:0;font-size:10px;letter-spacing:1.5px;color:#D4AF37;text-transform:uppercase;font-weight:600;">Name</p>
              <p style="margin:4px 0 0;font-size:14px;color:#FAFAFA;">${name}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 40px;">
              <p style="margin:0;font-size:10px;letter-spacing:1.5px;color:#D4AF37;text-transform:uppercase;font-weight:600;">Email</p>
              <p style="margin:4px 0 0;font-size:14px;color:#FAFAFA;"><a href="mailto:${email}" style="color:#FAFAFA;text-decoration:underline;text-decoration-color:#D4AF37;text-underline-offset:3px;">${email}</a></p>
            </td>
          </tr>
          <!-- Subject -->
          <tr>
            <td style="padding:10px 40px;">
              <p style="margin:0;font-size:10px;letter-spacing:1.5px;color:#D4AF37;text-transform:uppercase;font-weight:600;">Subject</p>
              <p style="margin:4px 0 0;font-size:14px;color:#FAFAFA;font-weight:500;">${subject}</p>
            </td>
          </tr>
          <tr>
            <td style="height:1px;background:rgba(212,175,55,0.1);margin:20px 40px;display:block;"></td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:10px 40px 30px;">
              <p style="margin:0;font-size:10px;letter-spacing:1.5px;color:#D4AF37;text-transform:uppercase;font-weight:600;">Message</p>
              <p style="margin:8px 0 0;font-size:14px;color:#FAFAFA;line-height:1.7;">${message}</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent);"></td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(250,250,250,0.3);letter-spacing:1px;">
                &copy; 2026 Ally Saleh — www.ally-saleh.com
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
