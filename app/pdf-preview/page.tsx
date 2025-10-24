'use client'

import { PDFViewer } from '@react-pdf/renderer'
import { ApplicationPDF } from '@/lib/pdf-template-react'
import { useState, useEffect } from 'react'

// Sample data for preview
const sampleData = {
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
  firstPositionBalance: "",
  firstAdvanceWith: "",
  firstPayment: "",
  rentMortgageAmount: "$3,500",
  landlordContact: "ABC Property Management",
  landlordNumber: "(555) 555-5555",
  owner1PrintName: "John Smith",
  owner1Date: "12/20/2024",
  owner2PrintName: "Jane Doe",
  owner2Date: "12/20/2024"
}

export default function PDFPreviewPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div>Loading PDF Preview...</div>
      </div>
    )
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        padding: '10px 20px',
        backgroundColor: '#37008F',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '18px' }}>PDF Preview - Live Editing Mode</h1>
        <div style={{ fontSize: '14px' }}>
          Edit <code style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '2px 6px',
            borderRadius: '3px',
            fontFamily: 'monospace'
          }}>lib/pdf-template-react.tsx</code> to see changes
        </div>
      </div>
      <PDFViewer
        width="100%"
        height="calc(100vh - 50px)"
        showToolbar={true}
      >
        <ApplicationPDF data={sampleData} />
      </PDFViewer>
    </div>
  )
}
