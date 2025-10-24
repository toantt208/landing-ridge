import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ApplicationForm from '@/components/ApplicationForm'

export const metadata: Metadata = {
  title: 'Business Funding Application (Mockup) - Ridge Crest Financial Group',
  description: 'Apply for business funding with Ridge Crest Financial Group. Complete our secure online application to get started with your business financing.',
  robots: 'noindex, nofollow',
}

// Sample data matching the test-pdf.sh and preview-pdf sample data
const mockData = {
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

export default function ApplicationMockupPage() {
  return (
    <>
      <header className="app-header">
        <div className="app-header__container">
          <Link href="/">
            <div className="app-header__logo">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={200}
                height={60}
                priority
              />
            </div>
          </Link>
        </div>
      </header>

      <main>
        <div className="questionnaireLayout">
          <div className="questionnaireWrapper">
            <div className="questionnaireContent">
              <div style={{
                backgroundColor: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#856404'
              }}>
                <strong>⚠️ Mockup Mode:</strong> This page is pre-filled with sample data for testing purposes.
                All fields are populated with example information.
              </div>
              <ApplicationForm defaultValues={mockData} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
