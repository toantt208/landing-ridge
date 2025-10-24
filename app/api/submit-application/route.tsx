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
