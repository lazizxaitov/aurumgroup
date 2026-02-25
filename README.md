## Aurum Landing

This project is a Next.js landing page for Aurum Global Group.

## Getting Started

Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Form Delivery Setup (Email + Telegram)

1. Create local env file:

```bash
cp .env.example .env.local
```

2. Fill values in `.env.local`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Backend route: `app/api/contact/route.ts`

Delivery behavior:

- If only Telegram is configured, form sends to Telegram.
- If only SMTP is configured, form sends to Email.
- If both are configured, form sends to both.
- If neither is configured, API returns config error.

## Notes

- `.env.local` is ignored by git.
- `.env.example` is committed as a template.
