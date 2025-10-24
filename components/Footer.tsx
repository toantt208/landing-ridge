import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="auto-container">
        <div className="footer__container">
          <div className="footer-connect">
            <Link href="/" className="footer-mob-logo">
              <Image className="logo-mobile" src="/images/logo.svg" width={219} height={40} alt="Footer Logo" />
            </Link>
            <h6 className="widget-title">Reach us</h6>
            <div className="connect">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#323738" />
                </svg>
                admin@ridgecrestfg.com
              </span>
            </div>
            <div className="social">
              <a href="https://www.facebook.com/people/Ridge-Crest-FG/61561639512371/" target="_blank" rel="noopener nofollow">
                <Image src="/images/facebook.svg" width={24} height={24} loading="lazy" alt="facebook" />
              </a>
              <a href="https://www.linkedin.com/company/ridgecrestfg" target="_blank" rel="noopener nofollow">
                <Image src="/images/linkedin.svg" width={24} height={24} loading="lazy" alt="linkedin" />
              </a>
            </div>
          </div>
          <div className="footer__widget">
            <div>
              <h6 className="widget-title">Company</h6>
              <ul className="widget-content">
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/blog">Blogs</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="widget-title">Legal</h6>
              <ul className="widget-content">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-description">
            <Link href="/" className="footer-desk-logo">
              <Image className="logo-desktop" src="/images/logo.svg" width={219} height={40} alt="Footer Logo" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
