import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  language: "ru" | "en" | "uz";
};

function validate(payload: ContactPayload) {
  if (!payload.fullName.trim()) return "Full name is required";
  if (!payload.phone.trim()) return "Phone is required";
  if (!payload.email.trim()) return "Email is required";
  if (!payload.message.trim()) return "Message is required";
  return null;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ContactPayload;
    const validationError = validate(data);
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const emailEnabled = Boolean(smtpHost && smtpUser && smtpPass && toEmail);
    const telegramEnabled = Boolean(telegramBotToken && telegramChatId);

    if (!emailEnabled && !telegramEnabled) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No delivery channel configured. Set SMTP_* and CONTACT_TO_EMAIL and/or TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.",
        },
        { status: 500 },
      );
    }

    const subject = `Aurum HR form: ${data.fullName}`;
    const text = [
      `Full name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Language: ${data.language}`,
      "",
      "Message:",
      data.message,
    ].join("\n");

    const deliveryErrors: string[] = [];

    if (emailEnabled) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: smtpUser,
          to: toEmail,
          subject,
          text,
        });
      } catch {
        deliveryErrors.push("email");
      }
    }

    if (telegramEnabled) {
      try {
        const telegramMessage = [
          "Aurum HR form",
          "",
          `Full name: ${data.fullName}`,
          `Phone: ${data.phone}`,
          `Email: ${data.email}`,
          `Language: ${data.language}`,
          "",
          "Message:",
          data.message,
        ].join("\n");

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
            }),
          },
        );

        if (!telegramRes.ok) {
          deliveryErrors.push("telegram");
        }
      } catch {
        deliveryErrors.push("telegram");
      }
    }

    if (deliveryErrors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: `Delivery failed for: ${deliveryErrors.join(", ")}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
  }
}
