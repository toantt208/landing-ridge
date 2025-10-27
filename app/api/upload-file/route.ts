import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      )
    }

    // Get Sanity credentials from environment variables
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const token = process.env.SANITY_API_TOKEN

    if (!projectId || !dataset || !token) {
      console.error('Missing Sanity credentials')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create FormData for Sanity
    const sanityFormData = new FormData()
    sanityFormData.append('file', file)

    // Upload to Sanity
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/assets/files/${dataset}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: sanityFormData,
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Sanity upload error:', errorText)
      return NextResponse.json(
        { error: 'Failed to upload file to Sanity' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      url: data.document.url,
      filename: file.name,
      size: file.size,
      fileId: data.document._id,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
