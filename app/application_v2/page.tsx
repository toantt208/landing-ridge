import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ApplicationFormV2 from '@/components/ApplicationFormV2'

export const metadata: Metadata = {
  title: 'Business Funding Application V2 - Ridgecrest Financial Group',
  description: 'Apply for business funding with Ridgecrest Financial Group. Complete our secure online application to get started with your business financing.',
  robots: 'index, follow',
}

export default function ApplicationV2Page() {
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
              <ApplicationFormV2 />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
