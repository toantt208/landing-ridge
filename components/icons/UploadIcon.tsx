import * as React from "react"
import { SVGProps } from "react"
const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19V9m0 0 2.5 2.5M12 9l-2.5 2.5"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.322 7.057a6.002 6.002 0 0 1 11.356 0A4.001 4.001 0 0 1 17 15h-1a1 1 0 1 1 0-2h1a2 2 0 1 0-.067-3.999 1 1 0 0 1-1.013-.8 4.002 4.002 0 0 0-7.84 0 1 1 0 0 1-1.013.8A2 2 0 1 0 7 13h1a1 1 0 1 1 0 2H7a4 4 0 0 1-.678-7.943Z"
      clipRule="evenodd"
    />
  </svg>
)
export default UploadIcon
