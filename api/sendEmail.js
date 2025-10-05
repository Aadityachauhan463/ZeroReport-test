import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Configure the transporter (for Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: "aadityachauhan733@gmail.com", // Gmail address
        pass: "xrownirhargeiuuy", // App password
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Your App"}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body, // plain text
      html: `<p>${body}</p>`, // HTML version
    });

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Email sent!", messageId: info.messageId });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}