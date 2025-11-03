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
        <h2 style="color: #37008F; border-bottom: 3px solid #37008F; padding-bottom: 10px; margin-bottom: 20px;">New Funding Application Submitted</h2>

        <table width="99%" border="0" cellpadding="1" cellspacing="0" bgcolor="#EAEAEA">
          <tr>
            <td>
              <table width="100%" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
                <!-- Business Information Section -->
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Business Legal Name</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.legalName || 'N/A'}</font></td>
                </tr>

                ${formData.dbaName ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>DBA Name</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.dbaName}</font></td>
                </tr>
                ` : ''}

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Business Address</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.businessAddress || 'N/A'}<br>${formData.businessCity || ''}, ${formData.businessState || ''} ${formData.businessZip || ''}</font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Email</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><a href="mailto:${formData.email}" style="color: #37008F;">${formData.email}</a></font></td>
                </tr>

                ${formData.phone ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Phone</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><a href="tel:${formData.phone}" style="color: #37008F;">${formData.phone}</a></font></td>
                </tr>
                ` : ''}

                ${formData.mobile ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Mobile</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.mobile}</font></td>
                </tr>
                ` : ''}

                ${formData.productService ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Product/Service</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.productService}</font></td>
                </tr>
                ` : ''}

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Partnership Type</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.partnership || 'N/A'}</font></td>
                </tr>

                ${formData.businessType ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Business Type</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.businessType}</font></td>
                </tr>
                ` : ''}

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date Business Started</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.dateStarted || 'N/A'}</font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>EIN</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.ein || 'N/A'}</font></td>
                </tr>

                <!-- Owner 1 Information -->
                ${formData.owner1Name ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:13px"><strong>━━━ OWNER #1 INFORMATION ━━━</strong></font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Name</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Name}</font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Address</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Address || 'N/A'}<br>${formData.owner1City || ''}, ${formData.owner1State || ''} ${formData.owner1Zip || ''}</font></td>
                </tr>

                ${formData.owner1Phone ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Phone</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Phone}</font></td>
                </tr>
                ` : ''}

                ${formData.owner1Email ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Email</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><a href="mailto:${formData.owner1Email}" style="color: #37008F;">${formData.owner1Email}</a></font></td>
                </tr>
                ` : ''}

                ${formData.owner1Ownership ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>% of Ownership</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Ownership}%</font></td>
                </tr>
                ` : ''}

                ${formData.owner1Dob ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date of Birth</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Dob}</font></td>
                </tr>
                ` : ''}

                ${formData.owner1Ssn ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>SSN</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Ssn}</font></td>
                </tr>
                ` : ''}

                ${formData.owner1Credit ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Credit Score</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Credit}</font></td>
                </tr>
                ` : ''}

                ${owner1Signature ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Owner #1 Signature</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><img src="${owner1Signature}" width="150" alt="Owner 1 Signature" /></font></td>
                </tr>
                ` : ''}
                ` : ''}

                <!-- Owner 2 Information -->
                ${formData.owner2Name ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:13px"><strong>━━━ OWNER #2 INFORMATION ━━━</strong></font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Name</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Name}</font></td>
                </tr>

                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Address</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Address || 'N/A'}<br>${formData.owner2City || ''}, ${formData.owner2State || ''} ${formData.owner2Zip || ''}</font></td>
                </tr>

                ${formData.owner2Phone ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Phone</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Phone}</font></td>
                </tr>
                ` : ''}

                ${formData.owner2Email ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Email</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><a href="mailto:${formData.owner2Email}" style="color: #37008F;">${formData.owner2Email}</a></font></td>
                </tr>
                ` : ''}

                ${formData.owner2Ownership ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>% of Ownership</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Ownership}%</font></td>
                </tr>
                ` : ''}

                ${formData.owner2Dob ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date of Birth</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Dob}</font></td>
                </tr>
                ` : ''}

                ${formData.owner2Ssn ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>SSN</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Ssn}</font></td>
                </tr>
                ` : ''}

                ${formData.owner2Credit ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Credit Score</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Credit}</font></td>
                </tr>
                ` : ''}

                ${owner2Signature ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Owner #2 Signature</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px"><img src="${owner2Signature}" width="150" alt="Owner 2 Signature" /></font></td>
                </tr>
                ` : ''}
                ` : ''}

                <!-- Financial Information -->
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:13px"><strong>━━━ FINANCIAL INFORMATION ━━━</strong></font></td>
                </tr>

                ${formData.fundingAmount ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Funding Amount Requested</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.fundingAmount}</font></td>
                </tr>
                ` : ''}

                ${formData.purposeOfFunds ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Purpose of Funds</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.purposeOfFunds}</font></td>
                </tr>
                ` : ''}

                ${formData.existingAdvances ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Existing Advances</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.existingAdvances}</font></td>
                </tr>
                ` : ''}

                ${formData.rentMortgageAmount ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Rent/Mortgage Amount</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.rentMortgageAmount}</font></td>
                </tr>
                ` : ''}

                ${formData.landlordContact ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Landlord Contact</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.landlordContact}</font></td>
                </tr>
                ` : ''}

                ${formData.landlordNumber ? `
                <tr bgcolor="#EAF2FA">
                  <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Landlord Phone</strong></font></td>
                </tr>
                <tr bgcolor="#FFFFFF">
                  <td width="20">&nbsp;</td>
                  <td><font style="font-family:sans-serif;font-size:12px">${formData.landlordNumber}</font></td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>
        </table>

        ${attachments && attachments.length > 0 ? `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📎 Uploaded Documents (${attachments.length})</h3>
          <div style="margin-top: 15px;">
            ${attachments.map((file: { url: any; filename: any; size: number }) => `
              <div style="background-color: #fff; padding: 12px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #ddd;">
                <a href="${file.url}" target="_blank" rel="noopener noreferrer" style="color: #37008F; text-decoration: none;">
                  <strong>${file.filename}</strong> (${formatFileSize(file.size)})
                </a>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div style="background-color: #fff; padding: 20px; border: 2px solid #37008F; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #37008F; margin-top: 0;">📄 Complete Application PDF</h3>
          <p style="margin-bottom: 0;">A detailed PDF of this application is attached to this email.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p>This application was submitted from the Ridgecrest Financial Group funding form.</p>
          <p>Submitted on: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>
        </div>
      </div>
    `

    // Send email to admin with PDF attachment
    await resend.emails.send({
      from: 'Ridgecrest Funding Application <noreply@ridgecrestfg.com>',
      to: adminEmail,
      subject: `New Funding Application from ${formData.legalName}`,
      html: adminHtmlContent,
      attachments: [
        {
          filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    // // Send confirmation email to applicant with PDF and uploaded files
    // await resend.emails.send({
    //   from: 'Ridgecrest Financial Group <onboarding@resend.dev>',
    //   to: formData.email,
    //   subject: 'Thank you for your funding application',
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    //       <h2 style="color: #37008F;">Thank You for Your Application!</h2>
    //       <p>Dear ${formData.owner1Name || 'Valued Client'},</p>
    //       <p>We have received your funding application for <strong>${formData.legalName}</strong> and appreciate your interest in Ridgecrest Financial Group.</p>
    //
    //       <h3 style="color: #37008F; margin-top: 30px; margin-bottom: 15px;">Your Application Details</h3>
    //
    //       <table width="99%" border="0" cellpadding="1" cellspacing="0" bgcolor="#EAEAEA">
    //         <tr>
    //           <td>
    //             <table width="100%" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
    //               <!-- Business Information -->
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Business Legal Name</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.legalName || 'N/A'}</font></td>
    //               </tr>
    //
    //               ${formData.dbaName ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>DBA Name</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.dbaName}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Address</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.businessAddress || 'N/A'}<br>${formData.businessCity || ''}, ${formData.businessState || ''} ${formData.businessZip || ''}</font></td>
    //               </tr>
    //
    //               ${formData.email ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Email</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.email}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.phone ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Phone</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.phone}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.mobile ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Mobile</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.mobile}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.productService ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Product/Service</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.productService}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Partnership</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.partnership || 'N/A'}</font></td>
    //               </tr>
    //
    //               ${formData.businessType ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Other</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.businessType}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date Business Started</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.dateStarted || 'N/A'}</font></td>
    //               </tr>
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>EIN</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.ein || 'N/A'}</font></td>
    //               </tr>
    //
    //               <!-- Owner 1 Information -->
    //               ${formData.owner1Name ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Name</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Name}</font></td>
    //               </tr>
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Address</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Address || 'N/A'}</font></td>
    //               </tr>
    //
    //               ${formData.owner1City ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>City</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1City}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner1State ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>State</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1State}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner1Zip ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Zip</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Zip}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner1Ownership ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>% of Ownership</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Ownership}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner1Dob ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date of Birth</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Dob}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner1Ssn ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>SSN#</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner1Ssn}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${owner1Signature ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Owner/Principle Signature</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px"><img src="${owner1Signature}" width="150" alt="Signature" /></font></td>
    //               </tr>
    //               ` : ''}
    //               ` : ''}
    //
    //               <!-- Owner 2 Information -->
    //               ${formData.owner2Name ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Name</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Name}</font></td>
    //               </tr>
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Address</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Address || 'N/A'}</font></td>
    //               </tr>
    //
    //               ${formData.owner2City ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>City</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2City}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner2State ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>State</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2State}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner2Zip ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Zip</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Zip}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner2Ownership ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>% of Ownership</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Ownership}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner2Dob ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Date of Birth</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Dob}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${formData.owner2Ssn ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>SSN#</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.owner2Ssn}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               ${owner2Signature ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Owner/Principle Signature</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px"><img src="${owner2Signature}" width="150" alt="Signature" /></font></td>
    //               </tr>
    //               ` : ''}
    //               ` : ''}
    //
    //               <!-- Funding Information -->
    //               ${formData.fundingAmount ? `
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Funding Amount Requested</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${formData.fundingAmount}</font></td>
    //               </tr>
    //               ` : ''}
    //
    //               <tr bgcolor="#EAF2FA">
    //                 <td colspan="2"><font style="font-family:sans-serif;font-size:12px"><strong>Submitted On</strong></font></td>
    //               </tr>
    //               <tr bgcolor="#FFFFFF">
    //                 <td width="20">&nbsp;</td>
    //                 <td><font style="font-family:sans-serif;font-size:12px">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</font></td>
    //               </tr>
    //             </table>
    //           </td>
    //         </tr>
    //       </table>
    //
    //       ${attachments && attachments.length > 0 ? `
    //       <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
    //         <h3 style="color: #333; margin-top: 0; margin-bottom: 10px;">📎 Documents Submitted (${attachments.length})</h3>
    //         ${attachments.map((file: { url: any; filename: any; size: number }) => `
    //           <div style="background-color: #fff; padding: 10px; border-radius: 4px; margin-bottom: 8px; border: 1px solid #ddd;">
    //             <a href="${file.url}" target="_blank" rel="noopener noreferrer" style="color: #37008F; text-decoration: none;">
    //               <strong>${file.filename}</strong> <span style="color: #666; font-size: 11px;">(${formatFileSize(file.size)})</span>
    //             </a>
    //           </div>
    //         `).join('')}
    //       </div>
    //       ` : ''}
    //
    //       <h3 style="color: #37008F; margin-top: 30px;">What's Next?</h3>
    //       <p>Our team will review your application and contact you within 1-2 business days to discuss the next steps. We may request additional information to complete the underwriting process.</p>
    //
    //       <div style="background-color: #fff; padding: 15px; border: 2px solid #37008F; border-radius: 8px; margin: 20px 0;">
    //         <p style="margin: 0; color: #37008F;"><strong>📄 Your Application PDF</strong></p>
    //         <p style="margin: 10px 0 0 0; font-size: 13px;">A copy of your completed application is attached to this email for your records.</p>
    //       </div>
    //
    //       <h3 style="color: #333; margin-top: 30px;">Need Assistance?</h3>
    //       <p>If you have any urgent questions, please feel free to contact us directly:</p>
    //
    //       <table width="100%" border="0" cellpadding="5" cellspacing="0" style="margin: 15px 0;">
    //         <tr>
    //           <td style="padding: 8px 0;"><font style="font-family:sans-serif;font-size:13px"><strong>Email:</strong></font></td>
    //           <td style="padding: 8px 0;"><font style="font-family:sans-serif;font-size:13px"><a href="mailto:admin@ridgecrestfg.com" style="color: #37008F; text-decoration: none;">admin@ridgecrestfg.com</a></font></td>
    //         </tr>
    //         <tr>
    //           <td style="padding: 8px 0;"><font style="font-family:sans-serif;font-size:13px"><strong>Phone:</strong></font></td>
    //           <td style="padding: 8px 0;"><font style="font-family:sans-serif;font-size:13px"><a href="tel:1-800-546-2190" style="color: #37008F; text-decoration: none;">1-800-546-2190</a></font></td>
    //         </tr>
    //       </table>
    //
    //       <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
    //         <p style="margin: 5px 0;">Best regards,</p>
    //         <p style="margin: 5px 0;"><strong>Ridgecrest Financial Group</strong></p>
    //         <p style="margin: 5px 0; color: #666; font-size: 14px;">Your Partner in Business Growth</p>
    //       </div>
    //     </div>
    //   `,
    //   attachments: [
    //     {
    //       filename: `application-${formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.pdf`,
    //       content: pdfBuffer,
    //     },
    //   ],
    // })

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
