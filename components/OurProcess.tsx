import Image from 'next/image'

export default function OurProcess() {
  return (
    <section className="our-process sec-padd">
      <div className="auto-container">
        <div className="section-title">
          <h2 className="title">Our <span>Process</span></h2>
        </div>
        <div className="process__container">
          <div className="process__content">
            <div className="img-content">
              <span>1</span>
              <Image src="/images/Icons-12.svg" width={64} height={64} alt="Apply" />
            </div>
            <h3 className="title">Apply</h3>
            <p>Apply online and secure financing for your business</p>
          </div>
          <div className="process__content">
            <div className="img-content">
              <span>2</span>
              <Image src="/images/Icons-6.svg" width={64} height={64} alt="Qualify" />
            </div>
            <h3 className="title">Qualify</h3>
            <p>6 months in business, 550 credit score, business checking account</p>
          </div>
          <div className="process__content">
            <div className="img-content">
              <span>3</span>
              <Image src="/images/Icons-15.svg" width={64} height={64} alt="Approval" />
            </div>
            <h3 className="title">Approval</h3>
            <p>Get approval within one business day</p>
          </div>
          <div className="process__content">
            <div className="img-content">
              <span>4</span>
              <Image src="/images/Icons-13.svg" width={64} height={64} alt="Funding" />
            </div>
            <h3 className="title">Funding</h3>
            <p>In most cases, get funds for your business within 24 hours</p>
          </div>
          <div className="process__content">
            <div className="img-content">
              <span>5</span>
              <Image src="/images/Icons-16.svg" width={64} height={64} alt="Renewals" />
            </div>
            <h3 className="title">Renewals</h3>
            <p>If your payments are up to date and 65% or more is paid off</p>
          </div>
        </div>
      </div>
    </section>
  )
}
