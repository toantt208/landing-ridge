import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <div className="auto-container">
        <div className="header__inner">
          <div className="header_logo">
            <Link href="/">
              <Image src="/images/logo.svg" width={219} height={40} alt="Header Logo" />
            </Link>
          </div>
          <nav className="header_nav">
            <ul className="nav_list">
              <li className="nav_item">
                <Link href="/blog" className="nav_link">Blog</Link>
              </li>
              <li className="nav_item">
                <Link href="/about-us" className="nav_link">About Us</Link>
              </li>
              <li className="nav_item">
                <Link href="/contact-us" className="nav_link">Contact Us</Link>
              </li>
              <li className="nav_item">
                <Link href="/application" className="nav_btn">Apply for Funding</Link>
              </li>
            </ul>
          </nav>
          <div className="humberget">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
              <path
                style={{ lineHeight: 'normal', textIndent: 0, textAlign: 'start', textDecorationLine: 'none', textDecorationStyle: 'solid', textDecorationColor: '#000', textTransform: 'none', isolation: 'auto', mixBlendMode: 'normal' }}
                d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
                fontWeight="400"
                fontFamily="sans-serif"
                overflow="visible"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
