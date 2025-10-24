import '../../styles/rubik-font.css'
import '../../styles/wp-block-library.min.css'
import '../../styles/contact-form-7.css'
import '../../styles/gravity-forms-theme-reset.min.css'
import '../../styles/gravity-forms-theme-foundation.min.css'
import '../../styles/gravity-forms-theme-framework.min.css'
import '../../styles/gravity-forms-orbital-theme.min.css'
import '../../styles/application-style.css'

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
