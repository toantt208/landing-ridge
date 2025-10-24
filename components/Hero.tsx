import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-main sec-padd">
      <div className="auto-container">
        <div className="hero__inner">
          <div className="text-content">
            <h1 className="title">
              <span>Elevate </span>Your Business & Experience <span>Excellence</span>
            </h1>
            <p className="desciption">
              Capitalize on <span>opportunities </span> with our <span>premium funding</span> solutions!
            </p>
            <div className="check_eligibility">
              <div className="eligibility-group">
                <span className="form-label">$</span>
                <input type="number" className="form-input" placeholder="How much money do you need?" />
              </div>
              <Link href="/application" className="form-btn">
                Check Eligibility
              </Link>
            </div>
            <ul>
              <li>
                <Image src="/images/lock.svg" width={16} height={16} alt="Secure" />
                Secure Form
              </li>
              <li>
                <Image src="/images/time.svg" width={16} height={16} alt="Fast" />
                Takes Just Minutes
              </li>
              <li>
                <Image src="/images/cancel.svg" width={16} height={16} alt="No Obligation" />
                No Obligation
              </li>
            </ul>
          </div>
          <div className="img-content">
            <div className="large-img">
              <Image src="/images/Rectangle-5686-2.png" width={690} height={500} alt="Business" />
            </div>
            <div className="small-img">
              <Image src="/images/Rectangle-5687-2.png" width={690} height={500} alt="Growth" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
