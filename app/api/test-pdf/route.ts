import { NextRequest, NextResponse } from 'next/server'
import html_to_pdf from 'html-pdf-node'
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

    // Generate filename with timestamp
    const timestamp = Date.now()
    const businessName = formData.legalName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `application-${businessName}-${timestamp}.pdf`

    // Save to public/pdfs directory
    const publicPath = path.join(process.cwd(), 'public', 'pdfs', filename)
    await writeFile(publicPath, pdfBuffer)

    // Return success with file path
    return NextResponse.json(
      {
        message: 'PDF generated successfully',
        success: true,
        filename: filename,
        url: `/pdfs/${filename}`,
        viewUrl: `http://localhost:3000/pdfs/${filename}`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      {
        message: 'Failed to generate PDF',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    )
  }
}
