import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ApplicationForm from '@/components/ApplicationForm'

export const metadata: Metadata = {
  title: 'Business Funding Application - Ridge Crest Financial Group',
  description: 'Apply for business funding with Ridge Crest Financial Group. Complete our secure online application to get started with your business financing.',
  robots: 'index, follow',
}

export default function ApplicationPage() {
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
              <ApplicationForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
