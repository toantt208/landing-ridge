import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { Resend } from 'resend'
import { generatePDFTemplate } from '@/lib/pdf-template'
import { ApplicationPDF } from '@/lib/pdf-template-react'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form data
    const formData = body.formData
    const owner1Signature = body.owner1Signature
    const owner2Signature = body.owner2Signature
    const fileNames = body.fileNames || []

    // Prepare data for PDF template
    const pdfData = {
      ...formData,
      owner1Signature,
      owner2Signature,
      fileNames
    }

    // Generate HTML from template (for email body)
    const htmlContent = generatePDFTemplate(pdfData)

    // Generate PDF buffer using React PDF (works in serverless environments)
    const pdfBuffer = await renderToBuffer(<ApplicationPDF data={pdfData} />)

    // Generate filename
    const timestamp = Date.now()
    const businessName = formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `application-${businessName}-${timestamp}.pdf`

    // Save PDF to public/pdfs directory for backup (only in development)
    if (process.env.NODE_ENV === 'development') {
      const publicPath = path.join(process.cwd(), 'public', 'pdfs', filename)
      await writeFile(publicPath, pdfBuffer)
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY)

    const adminEmail = 'submissions@ridgecrestfg.com'

    // Send email to admin with full application details
    await resend.emails.send({
      from: 'Ridge Crest Applications <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Funding Application - ${formData.legalName}`,
      html: htmlContent,
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    // Send confirmation email to submitter with a copy of the application
    await resend.emails.send({
      from: 'Ridge Crest Applications <onboarding@resend.dev>',
      to: formData.email,
      subject: `Application Received - ${formData.legalName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #37008F;">Thank You for Your Application</h2>
          <p>Dear ${formData.owner1Name || 'Applicant'},</p>
          <p>We have received your funding application for <strong>${formData.legalName}</strong>.</p>
          <p>Our team will review your application and get back to you shortly. A copy of your application is attached to this email for your records.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Ridge Crest Financial Group</strong></p>
          <p style="color: #666; font-size: 14px;">Email: admin@ridgecrestfg.com</p>
        </div>
      `,
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    return NextResponse.json(
      {
        message: 'Application submitted successfully and email sent',
        success: true,
        filename: filename,
        ...(process.env.NODE_ENV === 'development' && { pdfUrl: `/pdfs/${filename}` })
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      {
        message: 'Failed to submit application',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    )
  }
}
