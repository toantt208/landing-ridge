import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Script from 'next/script'
import ClientScripts from '@/components/ClientScripts'
import '../styles/style.css'
import './globals.css'

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Ridge Crest Financial Group - RidgeCrest',
  description: 'Get fast, flexible business loans & financing with Ridge Crest Financial Group. Secure capital, grow your business.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    title: 'Ridge Crest Financial Group - RidgeCrest',
    description: 'Get fast, flexible business loans & financing with Ridge Crest Financial Group. Secure capital, grow your business.',
    url: 'https://ridgecrestfg.com/',
    siteName: 'ridgecrestfg',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/RidgeCrest_Favi_G_B_2.png',
    apple: '/images/RidgeCrest_Favi_G_B_2.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="fusion-extension-loaded">
      <body className={rubik.className} data-rsssl="1">
        <ClientScripts />
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-5MCCQ73X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('set', 'linker', {"domains":["ridgecrestfg.com"]});
            gtag('js', new Date());
            gtag('set', 'developer_id.dZTNiMT', true);
            gtag('config', 'GT-5MCCQ73X');
            window._googlesitekit = window._googlesitekit || {};
            window._googlesitekit.throttledEvents = [];
            window._googlesitekit.gtagEvent = (name, data) => {
              var key = JSON.stringify({ name, data });
              if (!!window._googlesitekit.throttledEvents[key]) {
                return;
              }
              window._googlesitekit.throttledEvents[key] = true;
              setTimeout(() => {
                delete window._googlesitekit.throttledEvents[key];
              }, 5);
              gtag('event', name, { ...data, event_source: 'site-kit' });
            };
          `}
        </Script>
      </body>
    </html>
  )
}
