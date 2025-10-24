# RidgeCrest Financial Group - Next.js Website

This project has been successfully converted from a static HTML landing page to a modern Next.js 14 application with TypeScript and the App Router.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will be available at `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use).

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header with navigation
│   ├── Footer.tsx          # Footer with links
│   ├── Hero.tsx            # Hero section
│   ├── WhyUs.tsx           # Why Us and Funding Solutions sections
│   ├── Requirements.tsx    # Requirements section
│   ├── OurProcess.tsx      # Our Process section
│   ├── MoneyStarted.tsx    # Money Started section
│   ├── BusinessDecisions.tsx  # Business Decisions section
│   ├── GettingCall.tsx     # Getting Call section
│   └── FAQ.tsx             # FAQ with accordion
├── public/
│   ├── images/            # All image assets (SVG, PNG)
│   └── js/                # jQuery and custom scripts
├── styles/
│   └── style.css          # Main stylesheet (preserved from original)
└── package.json

```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features
- **jQuery** - For accordion and mobile menu (temporary)
- **Google Fonts (Rubik)** - Typography
- **CSS** - Original styles preserved as-is

## ✨ Features

- ✅ Server-side rendering with Next.js App Router
- ✅ TypeScript for type safety
- ✅ Optimized images with `next/image`
- ✅ SEO-optimized with proper metadata
- ✅ Google Analytics integration
- ✅ Responsive design
- ✅ Mobile-friendly navigation
- ✅ Interactive FAQ accordion
- ✅ All original styles preserved

## 📝 Key Sections

1. **Hero** - Main call-to-action with eligibility checker
2. **Why Us** - Three value propositions
3. **Funding Solutions** - Term Loans, Line of Credit, Revenue Based Financing
4. **Requirements** - Four key requirements to move forward
5. **Our Process** - 5-step process flow
6. **Money Started** - Funding amount selection
7. **Business Decisions** - Three decision factors
8. **Getting Call** - Contact information and hours
9. **FAQ** - Common questions with expandable answers

## 🎨 Styling

The original CSS has been preserved in `styles/style.css` and imported into the root layout. Some image paths for icons in CSS have been commented out - you can add the missing icon files to `/public/images/icon/` directory to restore them.

## 🔄 jQuery Integration

jQuery is currently used for:
- FAQ accordion functionality
- Mobile navigation toggle

These can be refactored to pure React hooks in the future if desired.

## 📷 Images

Image assets should be placed in the `/public/images/` directory. The following images are referenced by the application:

**Logos & Icons:**
- logo.svg
- lock.svg, time.svg, cancel.svg
- facebook.svg, linkedin.svg
- smartphone.svg
- Icons.png, Icons-1.png through Icons-16.svg

**Photos:**
- Rectangle-5686-2.png
- Rectangle-5687-2.png

## 🚢 Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended) - `vercel deploy`
- **Netlify** - Configure build command: `npm run build`
- **Any Node.js hosting** - Run `npm run build` then `npm start`

## 📄 License

© RidgeCrest Financial Group. All rights reserved.
