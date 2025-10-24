import { NextRequest, NextResponse } from 'next/server'
import html_to_pdf from 'html-pdf-node'
import nodemailer from 'nodemailer'
import { generatePDFTemplate } from '@/lib/pdf-template'
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

    // Generate HTML from template
    const htmlContent = generatePDFTemplate(pdfData)

    // PDF generation options
    const options = {
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    }

    const file = { content: htmlContent }

    // Generate PDF buffer
    const pdfBuffer = await html_to_pdf.generatePdf(file, options)

    // Save PDF to public/pdfs directory for backup
    const timestamp = Date.now()
    const businessName = formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `application-${businessName}-${timestamp}.pdf`
    const publicPath = path.join(process.cwd(), 'public', 'pdfs', filename)
    await writeFile(publicPath, pdfBuffer)

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: [formData.email, process.env.ADMIN_EMAIL].filter(Boolean).join(', '),
      subject: `New Funding Application - ${formData.legalName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #204ce5;">New Funding Application Received</h2>
          <p>A new funding application has been submitted.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Application Details</h3>
            <p><strong>Business Name:</strong> ${formData.legalName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Date Submitted:</strong> ${new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <p>Please find the complete application attached as a PDF document.</p>

          ${fileNames.length > 0 ? `
          <div style="margin-top: 20px;">
            <h4 style="color: #374151;">Additional Documents Uploaded:</h4>
            <ul>
              ${fileNames.map((name: string) => `<li>${name}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <p style="color: #6b7280; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      {
        message: 'Application submitted successfully and email sent',
        success: true,
        filename: filename,
        pdfUrl: `/pdfs/${filename}`
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
