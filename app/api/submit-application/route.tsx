import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { Resend } from 'resend'
import { generatePDFTemplate } from '@/lib/pdf-template'
import { ApplicationPDF } from '@/lib/pdf-template-react'
import { writeFile } from 'fs/promises'
import path from 'path'

interface Attachment {
  url: string
  filename: string
  size: number
  fileId: string
}

// Format file size helper
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// GET handler for PDF preview with sample data
export async function GET() {
  const sampleData = {
    formData: {
      legalName: "Acme Corporation LLC",
      dbaName: "Acme Solutions",
      businessAddress: "123 Main Street",
      businessCity: "New York",
      businessState: "New York",
      businessZip: "10001",
      email: "contact@acmecorp.com",
      phone: "(555) 123-4567",
      mobile: "(555) 987-6543",
      productService: "Software Development Services",
      partnership: "LLC",
      businessType: "Office",
      dateStarted: "01/15/2020",
      ein: "12-3456789",
      owner1Name: "John Smith",
      owner1Address: "456 Oak Avenue",
      owner1City: "Brooklyn",
      owner1State: "New York",
      owner1Zip: "11201",
      owner1Phone: "(555) 111-2222",
      owner1Email: "john.smith@acmecorp.com",
      owner1Ownership: "60",
      owner1Dob: "05/20/1980",
      owner1Ssn: "123-45-6789",
      owner1Credit: "750",
      owner2Name: "Jane Doe",
      owner2Address: "789 Pine Street",
      owner2City: "Queens",
      owner2State: "New York",
      owner2Zip: "11101",
      owner2Phone: "(555) 333-4444",
      owner2Email: "jane.doe@acmecorp.com",
      owner2Ownership: "40",
      owner2Dob: "08/15/1985",
      owner2Ssn: "987-65-4321",
      owner2Credit: "780",
      fundingAmount: "$250,000",
      purposeOfFunds: "Equipment purchase and expansion",
      existingAdvances: "No",
      rentMortgageAmount: "$3,500",
      landlordContact: "ABC Property Management",
      landlordNumber: "(555) 555-5555",
      owner1PrintName: "John Smith",
      owner1Date: "12/20/2024",
      owner2PrintName: "Jane Doe",
      owner2Date: "12/20/2024"
    },
    owner1Signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    owner2Signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    fileNames: [
      "bank-statement-november-2024.pdf",
      "bank-statement-december-2024.pdf",
      "tax-return-2023.pdf"
    ]
  }

  const pdfData = {
    ...sampleData.formData,
    owner1Signature: sampleData.owner1Signature,
    owner2Signature: sampleData.owner2Signature,
    fileNames: sampleData.fileNames
  }

  const htmlContent = generatePDFTemplate(pdfData)

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form data
    const formData = body.formData
    const owner1Signature = body.owner1Signature
    const owner2Signature = body.owner2Signature
    const attachments = body.attachments || [] as Attachment[]

    // Validate required fields
    if (!formData.legalName || !formData.email) {
      return NextResponse.json(
        {
          message: 'Please fill in all required fields',
          success: false
        },
        { status: 400 }
      )
    }

    // Prepare data for PDF template
    const pdfData = {
      ...formData,
      owner1Signature,
      owner2Signature,
      fileNames: attachments.map((f: { filename: any }) => f.filename)
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

    const adminEmail = process.env.NOTIFICATION_EMAIL || 'submissions@ridgecrestfg.com'

    // Prepare admin email content with attachments section
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #37008F; border-bottom: 3px solid #37008F; padding-bottom: 10px;">New Funding Application Submitted</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Business Name:</td>
              <td style="padding: 8px 0;">${formData.legalName}</td>
            </tr>
            ${formData.dbaName ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">DBA Name:</td>
              <td style="padding: 8px 0;">${formData.dbaName}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #37008F;">${formData.email}</a></td>
            </tr>
            ${formData.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${formData.phone}" style="color: #37008F;">${formData.phone}</a></td>
            </tr>
            ` : ''}
            ${formData.fundingAmount ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Funding Amount:</td>
              <td style="padding: 8px 0;">${formData.fundingAmount}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        ${attachments && attachments.length > 0 ? `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Uploaded Documents (${attachments.length})</h3>
          <div style="margin-top: 15px;">
            ${attachments.map((file: { url: any; filename: any; size: number }) => `
              <div style="background-color: #fff; padding: 12px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #ddd;">
                <a href="${file.url}" target="_blank" rel="noopener noreferrer" style="color: #37008F; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: bold; background-color: #37008F; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px;">
                    📎
                  </span>
                  <div>
                    <div style="font-weight: 500; color: #37008F;">${file.filename}</div>
                    <div style="font-size: 12px; color: #666;">${formatFileSize(file.size)}</div>
                  </div>
                </a>
              </div>
            `).join('')}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 15px; margin-bottom: 0;">
            Click on any file to open and download it.
          </p>
        </div>
        ` : ''}

        <div style="background-color: #fff; padding: 20px; border: 2px solid #37008F; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #37008F; margin-top: 0;">📄 Complete Application</h3>
          <p style="margin-bottom: 15px;">A detailed PDF of this application is attached to this email.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p>This application was submitted from the RidgeCrest Financial Group funding form.</p>
          <p>Submitted on: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>
        </div>
      </div>
    `

    console.log(1111, adminEmail)
    // Send email to admin with PDF attachment
    await resend.emails.send({
      from: 'Ridgecrest Funding Application <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: formData.email,
      subject: `New Funding Application from ${formData.legalName}`,
      html: adminHtmlContent,
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    // Send confirmation email to applicant with PDF and uploaded files
    await resend.emails.send({
      from: 'Ridgecrest Financial Group <onboarding@resend.dev>',
      to: formData.email,
      subject: 'Thank you for your funding application',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #37008F;">Thank You for Your Application!</h2>
          <p>Dear ${formData.owner1Name || 'Valued Client'},</p>
          <p>We have received your funding application for <strong>${formData.legalName}</strong> and appreciate your interest in Ridgecrest Financial Group.</p>

          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Application Summary</h3>
            <p><strong>Business Name:</strong> ${formData.legalName}</p>
            ${formData.fundingAmount ? `<p><strong>Requested Amount:</strong> ${formData.fundingAmount}</p>` : ''}
            ${attachments && attachments.length > 0 ? `
              <p><strong>Documents Submitted:</strong> ${attachments.length} file(s)</p>
              <ul style="list-style: none; padding: 0; margin-top: 10px;">
                ${attachments.map((file: { url: any; filename: any; size: number }) => `
                  <li style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                    <a href="${file.url}" target="_blank" rel="noopener noreferrer" style="color: #37008F; text-decoration: none;">
                      📎 ${file.filename} (${formatFileSize(file.size)})
                    </a>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>

          <h3 style="color: #333;">What's Next?</h3>
          <p>Our team will review your application and contact you within 1-2 business days to discuss the next steps. We may request additional information to complete the underwriting process.</p>

          <p>A copy of your completed application is attached to this email for your records.</p>

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
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    return NextResponse.json(
      {
        message: 'Application submitted successfully!',
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
        message: 'Failed to submit application. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    )
  }
}
