#!/bin/bash

# Test PDF Generation API (without sending email)
# Make sure your development server is running (npm run dev)

curl -X POST http://localhost:3000/api/test-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "legalName": "Acme Corporation LLC",
      "dbaName": "Acme Solutions",
      "businessAddress": "123 Main Street",
      "businessCity": "New York",
      "businessState": "New York",
      "businessZip": "10001",
      "email": "contact@acmecorp.com",
      "phone": "(555) 123-4567",
      "mobile": "(555) 987-6543",
      "productService": "Software Development Services",
      "partnership": "LLC",
      "businessType": "Office",
      "dateStarted": "01/15/2020",
      "ein": "12-3456789",
      "owner1Name": "John Smith",
      "owner1Address": "456 Oak Avenue",
      "owner1City": "Brooklyn",
      "owner1State": "New York",
      "owner1Zip": "11201",
      "owner1Phone": "(555) 111-2222",
      "owner1Email": "john.smith@acmecorp.com",
      "owner1Ownership": "60",
      "owner1Dob": "05/20/1980",
      "owner1Ssn": "123-45-6789",
      "owner1Credit": "750",
      "owner2Name": "Jane Doe",
      "owner2Address": "789 Pine Street",
      "owner2City": "Queens",
      "owner2State": "New York",
      "owner2Zip": "11101",
      "owner2Phone": "(555) 333-4444",
      "owner2Email": "jane.doe@acmecorp.com",
      "owner2Ownership": "40",
      "owner2Dob": "08/15/1985",
      "owner2Ssn": "987-65-4321",
      "owner2Credit": "780",
      "fundingAmount": "$250,000",
      "purposeOfFunds": "Equipment purchase and expansion",
      "existingAdvances": "No",
      "rentMortgageAmount": "$3,500",
      "landlordContact": "ABC Property Management",
      "landlordNumber": "(555) 555-5555",
      "owner1PrintName": "John Smith",
      "owner1Date": "12/20/2024",
      "owner2PrintName": "Jane Doe",
      "owner2Date": "12/20/2024"
    },
    "owner1Signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "owner2Signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "fileNames": [
      "bank-statement-november-2024.pdf",
      "bank-statement-december-2024.pdf",
      "tax-return-2023.pdf"
    ]
  }'

echo ""
echo ""
echo "PDF has been generated and saved!"
echo "Check the response above for the PDF URL."
echo ""
echo "To preview the HTML before PDF conversion, visit:"
echo "http://localhost:3000/api/preview-pdf"
