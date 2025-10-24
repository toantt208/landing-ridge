import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect } from '@react-pdf/renderer'

interface ApplicationData {
  legalName: string
  dbaName?: string
  businessAddress: string
  businessCity: string
  businessState: string
  businessZip: string
  email: string
  phone?: string
  mobile?: string
  productService?: string
  partnership: string
  businessType: string
  dateStarted: string
  ein: string
  owner1Name: string
  owner1Address: string
  owner1City: string
  owner1State: string
  owner1Zip: string
  owner1Phone?: string
  owner1Email?: string
  owner1Ownership: string
  owner1Dob: string
  owner1Ssn: string
  owner1Credit?: string
  owner2Name?: string
  owner2Address?: string
  owner2City?: string
  owner2State?: string
  owner2Zip?: string
  owner2Phone?: string
  owner2Email?: string
  owner2Ownership?: string
  owner2Dob?: string
  owner2Ssn?: string
  owner2Credit?: string
  fundingAmount?: string
  purposeOfFunds?: string
  existingAdvances?: string
  firstPositionBalance?: string
  firstAdvanceWith?: string
  firstPayment?: string
  rentMortgageAmount?: string
  landlordContact?: string
  landlordNumber?: string
  owner1PrintName?: string
  owner1Date?: string
  owner2PrintName?: string
  owner2Date?: string
  owner1Signature?: string
  owner2Signature?: string
  fileNames?: string[]
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 7,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
  },
  logoSection: {
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 6,
    color: '#333333',
    marginBottom: 6,
    padding: 4,
    lineHeight: 1.3,
  },
  sectionHeader: {
    backgroundColor: '#37008F',
    color: 'white',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    border: '1px solid #37008F',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #37008F',
  },
  tableCell: {
    flex: 1,
    padding: 3,
    borderRight: '1px solid #37008F',
    fontSize: 7,
  },
  tableCellLast: {
    flex: 1,
    padding: 3,
    fontSize: 7,
  },
  ownerHeader: {
    backgroundColor: '#37008F',
    color: 'white',
    padding: 3,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  ownerHeaderCell: {
    flex: 1,
    padding: 0,
    borderRight: '1px solid #37008F',
  },
  ownerHeaderCellLast: {
    flex: 1,
    padding: 0,
  },
  authorizationText: {
    fontSize: 6,
    color: '#333333',
    lineHeight: 1.2,
    marginVertical: 6,
    textAlign: 'justify',
  },
  signatureSection: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureColumn: {
    width: '48%',
  },
  signatureLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  signatureBox: {
    width: 120,
    height: 40,
    backgroundColor: '#d3d3d3',
    border: '1px solid #cccccc',
    marginBottom: 4,
  },
  signatureImage: {
    width: 120,
    height: 40,
    backgroundColor: '#d3d3d3',
  },
  signatureInfoRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  printNameField: {
    flex: 2,
    marginRight: 3,
  },
  dateField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  fieldValue: {
    fontSize: 6,
    borderBottom: '1px solid #000',
    paddingBottom: 1,
    paddingLeft: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  checkbox: {
    width: 8,
    height: 8,
    border: '1px solid #000',
    marginRight: 2,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 6,
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
  },
  splitCell: {
    flex: 1,
    flexDirection: 'row',
  },
  splitCellLeft: {
    flex: 1,
    padding: 3,
    borderRight: '1px solid #37008F',
    fontSize: 7,
  },
  splitCellRight: {
    flex: 1,
    padding: 3,
    fontSize: 7,
  },
})

const LogoSVG = () => (
  <Svg width="160" height="30" viewBox="0 0 229 42">
    <Path d="M34.1121 13.2563C35.4642 13.2563 36.0139 12.8007 36.2252 11.4739C36.3328 10.7971 36.3541 10.1174 36.2229 9.43495C35.9506 8.01653 35.4993 7.62581 34.0505 7.62524C27.9086 7.62297 13.1866 7.61103 7.0447 7.64174C6.26243 7.64572 5.7058 7.43756 5.15895 6.87964C3.35207 5.03751 0.0527344 1.26624 0.0527344 1.26624C8.59187 1.26624 25.7105 1.26224 34.2496 1.26339C38.4995 1.26396 41.1876 3.21699 42.3061 7.28856C43.1747 10.4513 42.8926 13.5236 41.0426 16.3394C39.6265 18.4949 37.5981 19.5914 34.9934 19.6284C34.2036 19.6397 33.4133 19.6301 32.4203 19.6301C35.1649 22.6495 48.832 37.7134 51.5783 40.7346C50.3268 40.7346 49.2642 40.7346 48.2016 40.7346C46.5968 40.7346 44.992 40.7323 43.3877 40.7368C43.051 40.738 42.7643 40.7158 42.5018 40.4246C38.1604 35.6041 17.8864 13.2534 17.8864 13.2534C23.2949 13.258 28.7035 13.2563 34.1121 13.2563Z" fill="#00B977"/>
    <Path d="M19.0849 19.6965C15.5091 19.6965 12.7977 19.6948 9.51099 19.6988C9.15226 19.6988 8.79008 19.7073 8.43481 19.7536C7.24059 19.9088 6.54674 20.5665 6.53408 21.7584C6.49607 25.2698 6.49607 28.7818 6.53696 32.2926C6.5502 33.4395 7.24059 34.0926 8.39277 34.2518C8.77453 34.3049 9.16493 34.3112 9.55187 34.3112C16.4719 34.3146 24.5435 34.3204 31.4635 34.3032C32.0106 34.3021 32.3745 34.4591 32.7355 34.869C34.4215 36.7836 36.1425 38.6681 37.9684 40.6935C28.9287 40.6935 18.2766 40.6859 9.23691 40.6998C6.35558 40.7043 3.94929 39.6962 2.05432 37.5378C0.951075 36.2813 0.248017 34.8136 0.166829 33.1518C-0.0277934 29.1512 -0.0796162 25.1385 0.16107 21.1448C0.416152 16.9164 3.92453 13.6276 8.20218 13.3639C9.71885 13.2702 11.2453 13.3273 12.7677 13.3136C12.9917 13.3113 13.1915 13.3268 13.3712 13.5049C15.4055 15.5155 16.8709 17.5198 19.0843 19.6965H19.0849Z" fill="#37008F"/>
    <Path d="M228.601 1.13892V4.22017H223.529V20.1718H219.712V4.22017H214.64V1.13892H228.601Z" fill="#37008F"/>
    <Path d="M205.604 20.3628C204.277 20.3628 203.078 20.1355 202.005 19.6811C200.951 19.2266 200.114 18.5722 199.496 17.7178C198.878 16.8634 198.56 15.8545 198.542 14.6911H202.632C202.687 15.4728 202.959 16.0908 203.45 16.5453C203.959 16.9998 204.65 17.227 205.523 17.227C206.413 17.227 207.113 17.0179 207.622 16.5998C208.131 16.1635 208.386 15.6 208.386 14.9092C208.386 14.3457 208.213 13.8821 207.868 13.5186C207.522 13.155 207.086 12.8732 206.559 12.6733C206.05 12.4551 205.341 12.2188 204.432 11.9643C203.196 11.6007 202.187 11.2463 201.405 10.9009C200.642 10.5373 199.978 10.001 199.415 9.29207C198.869 8.56493 198.597 7.60147 198.597 6.40169C198.597 5.27462 198.878 4.29298 199.442 3.45677C200.005 2.62056 200.796 1.98431 201.814 1.54803C202.832 1.09356 203.996 0.866333 205.304 0.866333C207.268 0.866333 208.858 1.34806 210.076 2.31152C211.312 3.25681 211.994 4.58384 212.121 6.29262H207.922C207.886 5.63819 207.604 5.10192 207.077 4.68382C206.568 4.24753 205.886 4.02939 205.032 4.02939C204.286 4.02939 203.687 4.22027 203.232 4.60202C202.796 4.98376 202.578 5.53821 202.578 6.26535C202.578 6.77435 202.741 7.20154 203.068 7.54693C203.414 7.87415 203.832 8.14682 204.323 8.36497C204.832 8.56493 205.541 8.80125 206.45 9.07393C207.686 9.4375 208.695 9.80107 209.476 10.1646C210.258 10.5282 210.931 11.0736 211.494 11.8007C212.058 12.5278 212.34 13.4822 212.34 14.6638C212.34 15.6818 212.076 16.6271 211.549 17.4997C211.022 18.3722 210.249 19.0721 209.231 19.5993C208.213 20.1083 207.004 20.3628 205.604 20.3628Z" fill="#37008F"/>
    <Path d="M188.338 4.2201V8.99195H194.745V12.0187H188.338V17.0632H195.563V20.1717H184.52V1.11157H195.563V4.2201H188.338Z" fill="#37008F"/>
    <Path d="M176.868 20.1718L172.669 12.755H170.869V20.1718H167.052V1.13892H174.196C175.668 1.13892 176.923 1.4025 177.959 1.92968C178.995 2.43868 179.768 3.13855 180.277 4.0293C180.804 4.90187 181.067 5.8835 181.067 6.97422C181.067 8.22853 180.704 9.36469 179.977 10.3827C179.25 11.3825 178.168 12.0733 176.732 12.455L181.286 20.1718H176.868ZM170.869 9.89187H174.06C175.096 9.89187 175.868 9.64646 176.377 9.15564C176.886 8.64664 177.141 7.94677 177.141 7.05602C177.141 6.18345 176.886 5.51085 176.377 5.03821C175.868 4.54739 175.096 4.30198 174.06 4.30198H170.869V9.89187Z" fill="#37008F"/>
    <Path d="M145.194 10.6283C145.194 8.75588 145.612 7.08346 146.448 5.611C147.303 4.12036 148.457 2.96603 149.911 2.14799C151.384 1.31178 153.029 0.893677 154.847 0.893677C156.974 0.893677 158.837 1.43903 160.437 2.52974C162.036 3.62045 163.154 5.12927 163.791 7.05619H159.4C158.964 6.14726 158.346 5.46557 157.546 5.01111C156.764 4.55665 155.856 4.32941 154.819 4.32941C153.711 4.32941 152.72 4.593 151.847 5.12018C150.993 5.62918 150.32 6.35632 149.829 7.3016C149.357 8.24688 149.12 9.35577 149.12 10.6283C149.12 11.8826 149.357 12.9915 149.829 13.9549C150.32 14.9002 150.993 15.6364 151.847 16.1636C152.72 16.6726 153.711 16.9271 154.819 16.9271C155.856 16.9271 156.764 16.6999 157.546 16.2454C158.346 15.7728 158.964 15.082 159.4 14.1731H163.791C163.154 16.1182 162.036 17.6361 160.437 18.7268C158.855 19.7993 156.992 20.3356 154.847 20.3356C153.029 20.3356 151.384 19.9266 149.911 19.1085C148.457 18.2723 147.303 17.118 146.448 15.6455C145.612 14.1731 145.194 12.5007 145.194 10.6283Z" fill="#37008F"/>
    <Path d="M128.929 4.2201V8.99195H135.337V12.0187H128.929V17.0632H136.155V20.1717H125.111V1.11157H136.155V4.2201H128.929Z" fill="#37008F"/>
    <Path d="M117.434 6.86532C116.997 6.06546 116.397 5.45648 115.634 5.03838C114.87 4.62027 113.98 4.41122 112.962 4.41122C111.835 4.41122 110.835 4.66572 109.962 5.17472C109.09 5.68371 108.408 6.41085 107.917 7.35614C107.426 8.30142 107.181 9.39213 107.181 10.6283C107.181 11.9008 107.426 13.0097 107.917 13.9549C108.426 14.9002 109.126 15.6274 110.017 16.1364C110.908 16.6454 111.944 16.8999 113.125 16.8999C114.58 16.8999 115.77 16.5181 116.697 15.7546C117.625 14.9729 118.234 13.8913 118.524 12.5097H111.98V9.59209H122.287V12.9188C122.033 14.2458 121.487 15.4728 120.651 16.5999C119.815 17.727 118.733 18.6359 117.406 19.3267C116.098 19.9993 114.625 20.3356 112.989 20.3356C111.153 20.3356 109.49 19.9266 107.999 19.1085C106.527 18.2723 105.363 17.118 104.509 15.6455C103.673 14.1731 103.254 12.5007 103.254 10.6283C103.254 8.75588 103.673 7.08346 104.509 5.611C105.363 4.12036 106.527 2.96603 107.999 2.14799C109.49 1.31178 111.144 0.893677 112.962 0.893677C115.107 0.893677 116.97 1.42085 118.552 2.47521C120.133 3.51138 121.224 4.97475 121.824 6.86532H117.434Z" fill="#37008F"/>
    <Path d="M91.2886 1.13892C93.2882 1.13892 95.0425 1.52975 96.5513 2.31143C98.0783 3.0931 99.2508 4.21108 100.069 5.66536C100.905 7.10147 101.323 8.77389 101.323 10.6826C101.323 12.5914 100.905 14.2638 100.069 15.6999C99.2508 17.1178 98.0783 18.2176 96.5513 18.9993C95.0425 19.781 93.2882 20.1718 91.2886 20.1718H84.6353V1.13892H91.2886ZM91.1523 16.9269C93.1519 16.9269 94.6971 16.3816 95.7878 15.2909C96.8785 14.2002 97.4239 12.6641 97.4239 10.6826C97.4239 8.70117 96.8785 7.156 95.7878 6.04711C94.6971 4.92004 93.1519 4.35651 91.1523 4.35651H88.4528V16.9269H91.1523Z" fill="#37008F"/>
    <Path d="M80.8639 1.13892V20.1718H77.0464V1.13892H80.8639Z" fill="#37008F"/>
    <Path d="M69.3945 20.1718L65.1953 12.755H63.3956V20.1718H59.5781V1.13892H66.7223C68.1948 1.13892 69.4491 1.4025 70.4853 1.92968C71.5214 2.43868 72.294 3.13855 72.803 4.0293C73.3302 4.90187 73.5938 5.8835 73.5938 6.97422C73.5938 8.22853 73.2302 9.36469 72.5031 10.3827C71.7759 11.3825 70.6943 12.0733 69.2582 12.455L73.8119 20.1718H69.3945ZM63.3956 9.89187H66.586C67.6221 9.89187 68.3947 9.64646 68.9037 9.15564C69.4127 8.64664 69.6672 7.94677 69.6672 7.05602C69.6672 6.18345 69.4127 5.51085 68.9037 5.03821C68.3947 4.54739 67.6221 4.30198 66.586 4.30198H63.3956V9.89187Z" fill="#37008F"/>
    <Rect x="59.5781" y="26.7867" width="169.286" height="14.3468" rx="3.39372" fill="#00B977"/>
    <Path d="M222.864 32.4252C222.864 32.861 222.759 33.2696 222.549 33.6509C222.347 34.0322 222.024 34.3396 221.58 34.5731C221.144 34.8066 220.592 34.9233 219.922 34.9233H218.557V38.0518H216.922V29.9037H219.922C220.553 29.9037 221.09 30.0126 221.533 30.2305C221.977 30.4485 222.308 30.7481 222.526 31.1294C222.751 31.5107 222.864 31.9427 222.864 32.4252ZM219.852 33.6042C220.304 33.6042 220.638 33.503 220.856 33.3007C221.074 33.0906 221.183 32.7987 221.183 32.4252C221.183 31.6314 220.74 31.2345 219.852 31.2345H218.557V33.6042H219.852Z" fill="white"/>
    <Path d="M206.542 29.9037V34.9466C206.542 35.4992 206.686 35.9233 206.974 36.2191C207.262 36.507 207.667 36.651 208.188 36.651C208.717 36.651 209.126 36.507 209.414 36.2191C209.702 35.9233 209.846 35.4992 209.846 34.9466V29.9037H211.492V34.935C211.492 35.6276 211.34 36.2152 211.036 36.6977C210.741 37.1724 210.34 37.5304 209.834 37.7716C209.336 38.0129 208.779 38.1335 208.165 38.1335C207.558 38.1335 207.005 38.0129 206.507 37.7716C206.017 37.5304 205.628 37.1724 205.34 36.6977C205.052 36.2152 204.908 35.6276 204.908 34.935V29.9037H206.542Z" fill="white"/>
    <Path d="M195.695 38.1333C194.932 38.1333 194.232 37.9543 193.594 37.5963C192.955 37.2383 192.45 36.7442 192.076 36.1138C191.702 35.4756 191.516 34.7558 191.516 33.9542C191.516 33.1604 191.702 32.4483 192.076 31.8179C192.45 31.1798 192.955 30.6817 193.594 30.3237C194.232 29.9657 194.932 29.7867 195.695 29.7867C196.465 29.7867 197.166 29.9657 197.796 30.3237C198.434 30.6817 198.936 31.1798 199.302 31.8179C199.675 32.4483 199.862 33.1604 199.862 33.9542C199.862 34.7558 199.675 35.4756 199.302 36.1138C198.936 36.7442 198.434 37.2383 197.796 37.5963C197.158 37.9543 196.457 38.1333 195.695 38.1333ZM195.695 36.6741C196.185 36.6741 196.617 36.5652 196.991 36.3473C197.364 36.1216 197.656 35.8025 197.866 35.39C198.076 34.9776 198.181 34.499 198.181 33.9542C198.181 33.4094 198.076 32.9347 197.866 32.53C197.656 32.1176 197.364 31.8024 196.991 31.5845C196.617 31.3666 196.185 31.2576 195.695 31.2576C195.204 31.2576 194.769 31.3666 194.387 31.5845C194.014 31.8024 193.722 32.1176 193.512 32.53C193.302 32.9347 193.197 33.4094 193.197 33.9542C193.197 34.499 193.302 34.9776 193.512 35.39C193.722 35.8025 194.014 36.1216 194.387 36.3473C194.769 36.5652 195.204 36.6741 195.695 36.6741Z" fill="white"/>
    <Path d="M184.785 38.0518L182.987 34.8766H182.217V38.0518H180.583V29.9037H183.641C184.271 29.9037 184.808 30.0165 185.252 30.2422C185.696 30.4601 186.026 30.7597 186.244 31.1411C186.47 31.5146 186.583 31.9349 186.583 32.4018C186.583 32.9388 186.427 33.4252 186.116 33.861C185.804 34.289 185.341 34.5848 184.727 34.7482L186.676 38.0518H184.785ZM182.217 33.6509H183.583C184.026 33.6509 184.357 33.5458 184.575 33.3357C184.793 33.1178 184.902 32.8182 184.902 32.4368C184.902 32.0633 184.793 31.7753 184.575 31.573C184.357 31.3629 184.026 31.2578 183.583 31.2578H182.217V33.6509Z" fill="white"/>
    <Path d="M173.443 32.3548C173.256 32.0124 172.999 31.7517 172.672 31.5727C172.345 31.3937 171.964 31.3042 171.528 31.3042C171.046 31.3042 170.618 31.4132 170.244 31.6311C169.871 31.849 169.579 32.1603 169.369 32.565C169.159 32.9696 169.054 33.4366 169.054 33.9658C169.054 34.5106 169.159 34.9853 169.369 35.39C169.587 35.7946 169.886 36.1059 170.268 36.3238C170.649 36.5417 171.093 36.6507 171.598 36.6507C172.221 36.6507 172.731 36.4873 173.128 36.1604C173.525 35.8258 173.785 35.3627 173.91 34.7713H171.108V33.5222H175.521V34.9464C175.412 35.5145 175.178 36.0398 174.82 36.5223C174.462 37.0048 173.999 37.3939 173.431 37.6896C172.871 37.9776 172.24 38.1216 171.54 38.1216C170.754 38.1216 170.042 37.9465 169.404 37.5963C168.773 37.2383 168.275 36.7441 167.91 36.1137C167.552 35.4833 167.373 34.7674 167.373 33.9658C167.373 33.1642 167.552 32.4482 167.91 31.8179C168.275 31.1797 168.773 30.6855 169.404 30.3353C170.042 29.9773 170.75 29.7983 171.528 29.7983C172.447 29.7983 173.244 30.024 173.921 30.4754C174.598 30.919 175.065 31.5455 175.322 32.3548H173.443Z" fill="white"/>
    <Path d="M153.56 36.756H156.245V38.0518H151.925V29.9037H153.56V36.756Z" fill="white"/>
    <Path d="M144.713 36.4991H141.468L140.931 38.0516H139.215L142.145 29.8918H144.048L146.978 38.0516H145.25L144.713 36.4991ZM144.269 35.1916L143.09 31.783L141.911 35.1916H144.269Z" fill="white"/>
    <Path d="M134.25 29.9037V38.0518H132.615V29.9037H134.25Z" fill="white"/>
    <Path d="M119.407 33.9658C119.407 33.1642 119.586 32.4482 119.944 31.8179C120.309 31.1797 120.804 30.6855 121.426 30.3353C122.057 29.9773 122.761 29.7983 123.539 29.7983C124.45 29.7983 125.247 30.0318 125.932 30.4988C126.617 30.9657 127.096 31.6116 127.368 32.4366H125.489C125.302 32.0474 125.037 31.7556 124.695 31.561C124.36 31.3665 123.971 31.2692 123.528 31.2692C123.053 31.2692 122.629 31.382 122.255 31.6077C121.889 31.8256 121.601 32.1369 121.391 32.5416C121.189 32.9463 121.088 33.421 121.088 33.9658C121.088 34.5028 121.189 34.9775 121.391 35.39C121.601 35.7946 121.889 36.1098 122.255 36.3355C122.629 36.5534 123.053 36.6624 123.528 36.6624C123.971 36.6624 124.36 36.5651 124.695 36.3705C125.037 36.1682 125.302 35.8725 125.489 35.4833H127.368C127.096 36.3161 126.617 36.9659 125.932 37.4328C125.255 37.892 124.457 38.1216 123.539 38.1216C122.761 38.1216 122.057 37.9465 121.426 37.5963C120.804 37.2383 120.309 36.7441 119.944 36.1137C119.586 35.4833 119.407 34.7674 119.407 33.9658Z" fill="white"/>
    <Path d="M114.336 38.0516H112.702L109.001 32.46V38.0516H107.367V29.8918H109.001L112.702 35.4951V29.8918H114.336V38.0516Z" fill="white"/>
    <Path d="M100.154 36.4991H96.9092L96.3723 38.0516H94.6562L97.5863 29.8918H99.4891L102.419 38.0516H100.691L100.154 36.4991ZM99.7109 35.1916L98.5319 31.783L97.3528 35.1916H99.7109Z" fill="white"/>
    <Path d="M89.6908 38.0516H88.0565L84.356 32.46V38.0516H82.7217V29.8918H84.356L88.0565 35.4951V29.8918H89.6908V38.0516Z" fill="white"/>
    <Path d="M77.2549 29.9037V38.0518H75.6206V29.9037H77.2549Z" fill="white"/>
    <Path d="M70.6094 29.9037V31.2228H67.2124V33.3124H69.8156V34.6081H67.2124V38.0518H65.5781V29.9037H70.6094Z" fill="white"/>
  </Svg>
)

const Checkbox = ({ checked }: { checked: boolean }) => (
  <View style={styles.checkbox}>
    {checked && <Text style={styles.checkmark}>✓</Text>}
  </View>
)

export const ApplicationPDF = ({ data }: { data: ApplicationData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <View style={styles.logoSection}>
        <LogoSVG />
      </View>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        Please complete this application and return with 6 months bank statements to receive a formal funding approval.
        There are no fees, charges or obligations associated with obtaining a pre-approval. Pre-approval does not constitute a funding commitment.
      </Text>

      {/* A. BUSINESS INFORMATION */}
      <View style={styles.table}>
        <Text style={styles.sectionHeader}>A. BUSINESS INFORMATION</Text>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Business Legal Name:</Text>
            <Text>{data.legalName || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Business DBA Name:</Text>
            <Text>{data.dbaName || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Street Address:</Text>
            <Text>{data.businessAddress || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>City:</Text>
            <Text>{data.businessCity || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingRight: 5, borderRight: '1px solid #37008F' }}>
                <Text style={styles.boldText}>State:</Text>
                <Text>{data.businessState || ''}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text style={styles.boldText}>Zip:</Text>
                <Text>{data.businessZip || ''}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Phone:</Text>
            <Text>{data.phone || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Product / Service Sold:</Text>
            <Text>{data.productService || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Mobile:</Text>
            <Text>{data.mobile || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.boldText}>Legal Entity:</Text>
              <View style={styles.checkboxContainer}>
                <Checkbox checked={data.partnership === 'Corp'} />
                <Text>Corp</Text>
                <Checkbox checked={data.partnership === 'Sole Prop'} />
                <Text>Sole Prop</Text>
                <Checkbox checked={data.partnership === 'LLC'} />
                <Text>LLC</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Fax:</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.boldText}>Business Location:</Text>
              <View style={styles.checkboxContainer}>
                <Checkbox checked={data.businessType === 'Store Front'} />
                <Text>Store Front</Text>
                <Checkbox checked={data.businessType === 'Office'} />
                <Text>Office</Text>
                <Checkbox checked={data.businessType === 'Home'} />
                <Text>Home</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Email:</Text>
            <Text>{data.email || ''}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: 0 }]}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Date Business Started:</Text>
            <Text>{data.dateStarted || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Federal State Tax #:</Text>
            <Text>{data.ein || ''}</Text>
          </View>
        </View>
      </View>

      {/* B. OWNER/PRINCIPLE INFORMATION */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.ownerHeaderCell}>
            <Text style={styles.ownerHeader}>B. OWNER/PRINCIPLE INFORMATION</Text>
          </View>
          <View style={styles.ownerHeaderCellLast}>
            <Text style={styles.ownerHeader}>OWNER #2 (IF APPLICABLE)</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Name:</Text>
            <Text>{data.owner1Name || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Name:</Text>
            <Text>{data.owner2Name || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Address:</Text>
            <Text>{data.owner1Address || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Address:</Text>
            <Text>{data.owner2Address || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>City, State Zip:</Text>
            <Text>{data.owner1City || ''}, {data.owner1State || ''} {data.owner1Zip || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>City, State Zip:</Text>
            <Text>{data.owner2City || ''}, {data.owner2State || ''} {data.owner2Zip || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Phone:</Text>
            <Text>{data.owner1Phone || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Phone:</Text>
            <Text>{data.owner2Phone || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Email:</Text>
            <Text>{data.owner1Email || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Email:</Text>
            <Text>{data.owner2Email || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>% of Ownership:</Text>
            <Text>{data.owner1Ownership || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>% of Ownership:</Text>
            <Text>{data.owner2Ownership || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Date of Birth:</Text>
            <Text>{data.owner1Dob || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Date of Birth:</Text>
            <Text>{data.owner2Dob || ''}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: 0 }]}>
          <View style={styles.tableCell}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingRight: 5, borderRight: '1px solid #37008F' }}>
                <Text style={styles.boldText}>SSN:</Text>
                <Text>{data.owner1Ssn || ''}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text style={styles.boldText}>Credit Score:</Text>
                <Text>{data.owner1Credit || ''}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellLast}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingRight: 5, borderRight: '1px solid #37008F' }}>
                <Text style={styles.boldText}>SSN#:</Text>
                <Text>{data.owner2Ssn || ''}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text style={styles.boldText}>Credit Score:</Text>
                <Text>{data.owner2Credit || ''}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* C. FINANCIAL INFORMATION */}
      <View style={styles.table}>
        <Text style={styles.sectionHeader}>C. FINANCIAL INFORMATION</Text>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Amount of Funding Requesting:</Text>
            <Text>{data.fundingAmount || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Purpose of Funds:</Text>
            <Text>{data.purposeOfFunds || ''}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.boldText}>Existing Advances:</Text>
              <View style={styles.checkboxContainer}>
                <Checkbox checked={data.existingAdvances === 'Yes'} />
                <Text>Yes</Text>
                <Checkbox checked={data.existingAdvances === 'No'} />
                <Text>No</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Outstanding Balances:</Text>
            <Text>{data.firstPositionBalance || ''}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: 0 }]}>
          <View style={styles.tableCell}>
            <Text style={styles.boldText}>Current Advances with:</Text>
            <Text>{data.firstAdvanceWith || ''}</Text>
          </View>
          <View style={styles.tableCellLast}>
            <Text style={styles.boldText}>Payment:</Text>
            <Text>{data.firstPayment || ''}</Text>
          </View>
        </View>
      </View>

      {/* D. LANDLORD OR MORTGAGE INFORMATION */}
      <View style={styles.table}>
        <Text style={styles.sectionHeader}>D. LANDLORD OR MORTGAGE INFORMATION</Text>

        <View style={[styles.tableRow, { borderBottom: 0 }]}>
          <View style={[styles.tableCell, { flex: 0.33 }]}>
            <Text style={styles.boldText}>Rent / Mortgage Monthly Amount:</Text>
            <Text>{data.rentMortgageAmount || ''}</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.33 }]}>
            <Text style={styles.boldText}>Landlord / Mortgage Contact:</Text>
            <Text>{data.landlordContact || ''}</Text>
          </View>
          <View style={[styles.tableCellLast, { flex: 0.34 }]}>
            <Text style={styles.boldText}>Landlord / Mortgage Number:</Text>
            <Text>{data.landlordNumber || ''}</Text>
          </View>
        </View>
      </View>

      {/* Authorization Text */}
      <Text style={styles.authorizationText}>
        By signing below, the Merchant and it's owners / principals: (1) certify that all information and documents submitted
        in connection with this Application is true, correct and complete; and (2) authorize RidgeCrest Financial Group, LLC and
        it's affiliates to receive credit reports including credit card processor statements and bank statements, from one or more
        consumer reporting agencies, such as TransUnion, Experian and Equifax, and from other credit bureaus, banks, creditors
        and other third parties regarding the Merchant and its owners and principals, to verify any information provided on the Application.
      </Text>

      {/* Signatures */}
      <View style={styles.signatureSection}>
        {/* Owner 1 Signature */}
        <View style={styles.signatureColumn}>
          <Text style={styles.signatureLabel}>Owner/Principle Signature:</Text>
          {data.owner1Signature ? (
            <Image src={data.owner1Signature} style={styles.signatureImage} />
          ) : (
            <View style={styles.signatureBox} />
          )}
          <View style={styles.signatureInfoRow}>
            <View style={styles.printNameField}>
              <Text style={styles.fieldLabel}>Print Name:</Text>
              <Text style={styles.fieldValue}>{data.owner1PrintName || ''}</Text>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Date:</Text>
              <Text style={styles.fieldValue}>{data.owner1Date || ''}</Text>
            </View>
          </View>
        </View>

        {/* Owner 2 Signature */}
        <View style={styles.signatureColumn}>
          <Text style={styles.signatureLabel}>Owner/Principle Signature:</Text>
          {data.owner2Signature ? (
            <Image src={data.owner2Signature} style={styles.signatureImage} />
          ) : (
            <View style={styles.signatureBox} />
          )}
          <View style={styles.signatureInfoRow}>
            <View style={styles.printNameField}>
              <Text style={styles.fieldLabel}>Print Name:</Text>
              <Text style={styles.fieldValue}>{data.owner2PrintName || ''}</Text>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Date:</Text>
              <Text style={styles.fieldValue}>{data.owner2Date || ''}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)
