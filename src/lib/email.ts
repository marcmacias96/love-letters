import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendLetterEmail({
  to,
  senderName,
  recipientName,
  letterUrl,
}: {
  to: string;
  senderName: string;
  recipientName: string | null;
  letterUrl: string;
}) {
  const greeting = recipientName ? `Hola ${recipientName},` : "Hola,";

  if (!resend) {
    console.log(
      `[email] RESEND_API_KEY no configurada. Carta disponible en: ${letterUrl}`
    );
    return { skipped: true };
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Cartas de Amor <onboarding@resend.dev>",
    to,
    subject: `${senderName} te ha escrito una carta`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fdf6ec; border-radius: 12px;">
        <p style="font-size: 16px; color: #4a3728;">${greeting}</p>
        <p style="font-size: 16px; color: #4a3728;">
          <strong>${senderName}</strong> te ha escrito una carta de amor.
        </p>
        <p style="text-align: center; margin: 32px 0;">
          <a href="${letterUrl}" style="background: #b3492f; color: #fff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
            Abrir la carta
          </a>
        </p>
        <p style="font-size: 13px; color: #9c8a78;">Si el botón no funciona, copia este link: ${letterUrl}</p>
      </div>
    `,
  });
}
