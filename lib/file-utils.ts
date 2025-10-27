// Client-safe file utilities (no Sanity client dependency)

// Validate file before upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 100 * 1024 * 1024 // 100MB in bytes

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
  ]

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 100MB limit' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed. Please upload PDF, DOC, DOCX, XLS, XLSX, CSV, JPG, PNG, or GIF files.' }
  }

  return { valid: true }
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Helper to get file extension icon/type
export function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()

  const typeMap: { [key: string]: string } = {
    pdf: 'PDF',
    doc: 'DOC',
    docx: 'DOC',
    xls: 'XLS',
    xlsx: 'XLS',
    csv: 'CSV',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    gif: 'Image',
  }

  return typeMap[ext || ''] || 'File'
}
