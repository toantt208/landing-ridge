import Image from 'next/image'

export default function BusinessDecisions() {
  return (
    <section className="business-decisions sec-padd">
      <div className="auto-container">
        <div className="section-title">
          <h2 className="title">Make Better <span>Business Decisions</span></h2>
        </div>
        <div className="business-decisions__container">
          <div className="business-decisions__content">
            <Image src="/images/Icons-3.png" width={110} height={110} alt="Simple & Streamlined Process" />
            <h3 className="title">Simple & Streamlined <span>Process</span></h3>
            <p>Secure financing quickly and easily to focus on what truly matters – <br />growing your business.</p>
          </div>
          <div className="business-decisions__content">
            <Image src="/images/Icons-4.png" width={110} height={110} alt="Tailored Financing Solutions" />
            <h3 className="title">Tailored Financing <span>Solutions</span></h3>
            <p>We provide specialized funding to <br />help businesses thrive. No matter <br />the loan type, we&apos;ve got you covered.</p>
          </div>
          <div className="business-decisions__content">
            <Image src="/images/Icons-5.png" width={110} height={110} alt="Flexible Payment Options" />
            <h3 className="title">Flexible Payment <span>Options</span></h3>
            <p>Daily, weekly, or semi-monthly <br />payment plans to suit your <br />business&apos;s cash flow.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
