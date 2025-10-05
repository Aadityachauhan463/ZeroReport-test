import { Resend } from 'resend';

const resend = new Resend("re_d5J1h2qf_MWX97xHhC5JdBYzXP95NURUX");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const email = await resend.emails.send({
      from: 'aadityachauhan733@gmail.com',
      to,
      subject,
      html: `<p>${body}</p>`,
    });

    res.status(200).json({ message: 'Email sent!', emailId: email.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}