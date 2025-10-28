import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form data
    const { firstName, lastName, email, phone, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          message: 'Please fill in all required fields',
          success: false
        },
        { status: 400 }
      )
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY)

    const adminEmail = 'submissions@ridgecrestfg.com'

    // Prepare email content for admin
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #37008F; border-bottom: 3px solid #37008F; padding-bottom: 10px;">New Contact Form Submission</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #37008F;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #37008F;">${phone}</a></td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Subject:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        ${message ? `
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #37008F; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p>This message was sent from the RidgeCrest Financial Group contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>
        </div>
      </div>
    `

    // Send email to admin
    await resend.emails.send({
      from: 'Ridgecrest Contact Form <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : `New Contact Form Submission from ${firstName} ${lastName}`,
      html: adminHtmlContent,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Ridgecrest Financial Group <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Ridgecrest Financial Group',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #37008F;">Thank You for Reaching Out!</h2>
          <p>Dear ${firstName},</p>
          <p>We have received your message and appreciate you taking the time to contact us.</p>
          <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>

          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            ${message ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${message}</p>` : ''}
          </div>

          <p>If you have any urgent questions, please feel free to contact us directly:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:admin@ridgecrestfg.com" style="color: #37008F;">admin@ridgecrestfg.com</a><br>
            <strong>Phone:</strong> <a href="tel:1-800-546-2190" style="color: #37008F;">1-800-546-2190</a>
          </p>
          <br>
          <p>Best regards,</p>
          <p><strong>Ridgecrest Financial Group</strong></p>
          <p style="color: #666; font-size: 14px;">Your Partner in Business Growth</p>
        </div>
      `,
    })

    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        success: true
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      {
        message: 'Failed to send message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    )
  }
}
