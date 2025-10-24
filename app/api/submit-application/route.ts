import { NextRequest, NextResponse } from 'next/server'
import html_to_pdf from 'html-pdf-node'
import { Resend } from 'resend'
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
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    }

    const file = { content: htmlContent }

    // Generate PDF buffer
    const pdfBuffer = (await html_to_pdf.generatePdf(file, options)) as unknown as Buffer

    // Save PDF to public/pdfs directory for backup
    const timestamp = Date.now()
    const businessName = formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `application-${businessName}-${timestamp}.pdf`
    const publicPath = path.join(process.cwd(), 'public', 'pdfs', filename)
    await writeFile(publicPath, pdfBuffer)

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Prepare email recipients
    const recipients = [formData.email]
    if (process.env.NOTIFICATION_EMAIL) {
      recipients.push(process.env.NOTIFICATION_EMAIL)
    }

    // Send email using Resend with the same HTML used for PDF generation
    await resend.emails.send({
      from: 'Ridge Crest Applications <onboarding@resend.dev>',
      to: recipients,
      subject: `New Funding Application - ${formData.legalName}`,
      html: htmlContent,
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
