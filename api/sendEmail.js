export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer re_d5J1h2qf_MWX97xHhC5JdBYzXP95NURUX`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to,
        subject,
        html: `<p>${body}</p>`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}