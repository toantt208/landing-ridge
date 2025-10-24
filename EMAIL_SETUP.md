# Email Notification Setup Guide

This application uses [Resend](https://resend.com) to send email notifications when users submit funding applications. Resend is free for up to 3,000 emails per month and 100 emails per day.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Go to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name (e.g., "Ridge Crest Applications")
5. Copy the API key (it starts with `re_`)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   NOTIFICATION_EMAIL=your-email@example.com
   ```

3. Replace:
   - `re_your_actual_api_key_here` with your actual Resend API key
   - `your-email@example.com` with the email where you want to receive application notifications

### 4. Domain Verification (Optional but Recommended)

By default, Resend allows you to send emails from `onboarding@resend.dev`. For production use, you should verify your own domain:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `ridgecrestfg.com`)
4. Add the DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

Once verified, update the API route to use your domain:

In `app/api/submit-application/route.ts`, change:
```typescript
from: "Ridge Crest Applications <onboarding@resend.dev>",
```
to:
```typescript
from: "Ridge Crest Applications <applications@ridgecrestfg.com>",
```

### 5. Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/application` page
3. Fill out the form
4. Submit it
5. Check your email (the one you specified in `NOTIFICATION_EMAIL`)

## Email Features

The email notification includes:

- ✅ All business information
- ✅ Owner #1 and Owner #2 details (complete information)
- ✅ Financial information (including existing advances)
- ✅ Landlord/Mortgage details (complete contact information)
- ✅ **PDF attachment** - Auto-generated professional PDF of the complete application
- ✅ File attachments (bank statements uploaded by applicant)
- ✅ Professional HTML formatting
- ✅ Timestamp of submission

### PDF Generation

Every application submission automatically generates a professionally formatted PDF that includes:
- Complete business information
- All owner/principal details (Owner #1 and Owner #2 if provided)
- Financial information with existing advances breakdown
- Landlord/Mortgage information
- Certification statement
- Branded header and footer with Ridge Crest Financial Group styling

The PDF is automatically attached to the email with a filename format:
`Application-{BusinessName}_{timestamp}.pdf`

## Troubleshooting

### "Failed to send email notification"

- Check that your `RESEND_API_KEY` is correct
- Make sure you copied the entire API key (starts with `re_`)
- Verify your Resend account is active

### Emails going to spam

- Verify your domain in Resend
- Use your verified domain as the sender email
- Add SPF and DKIM records to your domain DNS

### File attachments not working

- Check file size (Resend has a 40MB limit per email)
- Verify the file type is allowed (.pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png)
- Note: The application PDF is always generated and attached, even if no bank statements are uploaded

### PDF generation errors

- Ensure React-PDF is installed: `pnpm install @react-pdf/renderer`
- Check that the PDF generation utility exists at `lib/generate-pdf.tsx`
- Verify the API route can import the PDF generator

## Free Tier Limits

Resend's free tier includes:

- 3,000 emails per month
- 100 emails per day
- All features unlocked
- No credit card required

For higher volume, check [Resend Pricing](https://resend.com/pricing).

## Alternative: Using Gmail SMTP (Not Recommended)

If you prefer using Gmail SMTP instead of Resend:

1. Install nodemailer:
   ```bash
   pnpm add nodemailer
   ```

2. Create an [App Password](https://myaccount.google.com/apppasswords) in your Google account

3. Update the API route to use nodemailer

**Note:** Resend is recommended as it's more reliable, has better deliverability, and is specifically designed for transactional emails.

## Security Notes

- ⚠️ Never commit `.env.local` to git (it's already in `.gitignore`)
- ⚠️ Keep your Resend API key secret
- ⚠️ For production, use environment variables from your hosting platform (Vercel, etc.)
- ⚠️ Sensitive data (SSN, credit scores) is sent via email - ensure your notification email is secure

## Support

- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)
