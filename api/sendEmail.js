import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { to, subject, body } = req.body;
    if (!to || !subject || !body) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Setup transporter (explicit host/port to avoid confusion)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection (helpful debug)
    await transporter.verify().catch(err => {
      throw new Error("SMTP verification failed: " + err.message);
    });

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Mailer"}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });

    return res.status(200).json({ message: "Email sent!", messageId: info.messageId });

  } catch (error) {
    // The key fix: always return clean JSON
    console.error("Email send error:", error);
    return res.status(500).json({
      error: error?.message || "Unknown error occurred",
      stack: error?.stack || null,
    });
  }
}