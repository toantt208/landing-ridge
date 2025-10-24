'use client'

import Link from 'next/link'

export default function FAQ() {
  return (
    <section className="faq-main sec-padd">
      <div className="auto-container">
        <div className="section-title">
          <h2 className="heading">Frequently <span>asked questions</span></h2>
        </div>
        <div className="faq__container">
          <div className="faq__content">
            <div className="accordion-section">
              <h3 className="accordion-header">Who is Ridge Crest Financial Group?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                Ridge Crest Financial Group is a leading provider of specialized financial solutions designed to help small and medium-sized businesses reach their full potential.
              </p>
            </div>
            <div className="accordion-section">
              <h3 className="accordion-header">What financial solutions does Ridge Crest Financial offer?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                Ridge Crest Financial offers flexible term loans, lines of credit, and creative, customized financing solutions tailored to your business needs.
              </p>
            </div>
            <div className="accordion-section">
              <h3 className="accordion-header">Do I need to provide securities to qualify?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                No, Ridge Crest Financial Group offers unsecured loans. In specific cases, RCFG may secure our loans with a general lien on your business assets and a personal guarantee. Rest assured, your personal assets are not used as collateral.
              </p>
            </div>
          </div>

          <div className="faq__content">
            <div className="accordion-section">
              <h3 className="accordion-header">How can Ridge Crest Financial help my business?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                Ridge Crest Financial Group provides customized financing options, including flexible loans and lines of credit tailored to your needs. With expert guidance and continuous support, we help your business thrive and succeed.
              </p>
            </div>
            <div className="accordion-section">
              <h3 className="accordion-header">What can I use the funding towards?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                Ridge Crest Financial Group allows flexibility in the use of funds, provided they are for legitimate business purposes.
              </p>
            </div>
            <div className="accordion-section">
              <h3 className="accordion-header">Can I qualify for a business loan or line of credit if I have bad credit?</h3>
              <p className="accordion-content" style={{ display: 'none' }}>
                Absolutely! Each applicant is considered on a case-by-case basis. Even with bad credit, you can still qualify for a business loan or line of credit. We consider your overall business health, not just your credit score.
              </p>
            </div>
          </div>
        </div>
        <div className="funding__container">
          <h3 className="title">Get the Funding <span>You Need</span></h3>
          <Link href="/application" className="btn">Start Now</Link>
        </div>
      </div>
    </section>
  )
}
