#!/bin/bash

# Preview the PDF HTML template in browser
# Make sure your development server is running (npm run dev)

echo "Opening HTML preview in browser..."
echo "URL: http://localhost:3000/api/preview-pdf"
echo ""
echo "This shows how the PDF will look with sample data."
echo "You can modify the HTML template in: lib/pdf-template.ts"
echo ""

# Try to open in default browser
if command -v open &> /dev/null; then
    # macOS
    open http://localhost:3000/api/preview-pdf
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3000/api/preview-pdf
elif command -v start &> /dev/null; then
    # Windows
    start http://localhost:3000/api/preview-pdf
else
    echo "Could not detect browser. Please open manually:"
    echo "http://localhost:3000/api/preview-pdf"
fi
