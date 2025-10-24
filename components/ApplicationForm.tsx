'use client'

import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/datepicker-custom.css'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface FormData {
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
  files?: FileList
}

interface FileWithProgress {
  file: File
  progress: number
  id: string
}

interface ApplicationFormProps {
  defaultValues?: Partial<FormData>
}

export default function ApplicationForm({ defaultValues }: ApplicationFormProps = {}) {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormData>({
    defaultValues: defaultValues || {}
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const owner1SignatureRef = useRef<HTMLCanvasElement>(null)
  const owner2SignatureRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState({ owner1: false, owner2: false })
  const [isDragging, setIsDragging] = useState(false)
  const [filesWithProgress, setFilesWithProgress] = useState<FileWithProgress[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper to format date as MM/DD/YYYY for form submission
  const formatDateForSubmit = (date: Date | null): string => {
    if (!date) return ''
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Helper to parse date string (MM/DD/YYYY) to Date object
  const parseDateString = (dateStr: string | undefined): Date | null => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length !== 3) return null
    const [month, day, year] = parts.map(p => parseInt(p, 10))
    if (isNaN(month) || isNaN(day) || isNaN(year)) return null
    return new Date(year, month - 1, day)
  }

  useEffect(() => {
    const setupCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }

    setupCanvas(owner1SignatureRef.current)
    setupCanvas(owner2SignatureRef.current)
  }, [])

  const startDrawing = (canvas: HTMLCanvasElement | null, ownerKey: 'owner1' | 'owner2') => (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas) return
    setIsDrawing({ ...isDrawing, [ownerKey]: true })
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (canvas: HTMLCanvasElement | null, ownerKey: 'owner1' | 'owner2') => (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas || !isDrawing[ownerKey]) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = (ownerKey: 'owner1' | 'owner2') => () => {
    setIsDrawing({ ...isDrawing, [ownerKey]: false })
  }

  const clearSignature = (canvas: HTMLCanvasElement | null) => () => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const simulateUpload = (fileWithProgress: FileWithProgress) => {
    const interval = setInterval(() => {
      setFilesWithProgress(prev =>
        prev.map(f => {
          if (f.id === fileWithProgress.id && f.progress < 100) {
            return { ...f, progress: Math.min(f.progress + 10, 100) }
          }
          return f
        })
      )
    }, 200)

    setTimeout(() => clearInterval(interval), 2200)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    addFiles(files)
  }

  const addFiles = (files: File[]) => {
    const newFilesWithProgress: FileWithProgress[] = files.map(file => ({
      file,
      progress: 0,
      id: Math.random().toString(36).substring(7)
    }))

    setFilesWithProgress(prev => [...prev, ...newFilesWithProgress])

    // Update react-hook-form
    const dataTransfer = new DataTransfer()
    const allFiles = [...filesWithProgress.map(f => f.file), ...files]
    allFiles.forEach(file => dataTransfer.items.add(file))
    setValue('files', dataTransfer.files)

    // Simulate upload for each new file
    newFilesWithProgress.forEach(fileWithProgress => {
      simulateUpload(fileWithProgress)
    })
  }

  const removeFile = (id: string) => {
    setFilesWithProgress(prev => {
      const updated = prev.filter(f => f.id !== id)

      // Update react-hook-form
      const dataTransfer = new DataTransfer()
      updated.forEach(f => dataTransfer.items.add(f.file))
      setValue('files', dataTransfer.files)

      return updated
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleSelectFilesClick = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Convert signature canvases to base64 images
      const owner1SignatureData = owner1SignatureRef.current?.toDataURL('image/png') || null
      const owner2SignatureData = owner2SignatureRef.current?.toDataURL('image/png') || null

      // Get file names from uploaded files
      const fileNames = filesWithProgress.map(f => f.file.name)

      // Prepare payload
      const payload = {
        formData: data,
        owner1Signature: owner1SignatureData,
        owner2Signature: owner2SignatureData,
        fileNames
      }

      // Send to API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        alert('Application submitted successfully! A PDF copy has been sent to your email.')
        // Optional: Reset form or redirect
        // window.location.href = '/thank-you'
      } else {
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(`Error submitting form: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="gf_browser_chrome gform_wrapper gform-theme gform-theme--foundation gform-theme--framework gform-theme--orbital"
      data-form-theme="orbital"
      id="gform_wrapper_6"
      data-form-index="0"
    >
      <div className="gform_heading">
        <h2 className="gform_title">Apply for Funding</h2>
        <p className="gform_description"></p>
      </div>

      <form method="post" encType="multipart/form-data" id="gform_6" onSubmit={handleSubmit(onSubmit)}>
        <div className="gform_body gform-body">
          <div className="gform_fields top_label form_sublabel_below description_below">
            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="legalName">
                Business Legal Name <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="legalName"
                  className="large"
                  {...register('legalName', { required: true })}
                />
                {errors.legalName && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="dbaName">
                Business DBA Name
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="dbaName"
                  className="large"
                  {...register('dbaName')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-address gfield--width-full">
              <label className="gfield_label gform-field-label">
                Address <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_address">
                <span className="ginput_full address_line_1 ginput_address_line_1 gform-grid-col" style={{paddingInline: 0}}>
                  <input
                    type="text"
                    id="businessAddress"
                    className="large"
                    {...register('businessAddress', { required: true })}
                  />
                  <label className="gform-field-label gform-field-label--type-sub" htmlFor="businessAddress">Street Address</label>
                </span>
                <span className="ginput_left address_city ginput_address_city gform-grid-col" style={{paddingInline: 0}}>
                  <input
                    type="text"
                    id="businessCity"
                    className="large"
                    {...register('businessCity', { required: true })}
                  />
                  <label className="gform-field-label gform-field-label--type-sub" htmlFor="businessCity">City</label>
                </span>
                <span className="ginput_right address_state ginput_address_state gform-grid-col" style={{paddingInline: 0}}>
                  <select
                    id="businessState"
                    {...register('businessState', { required: true })}
                  >
                    <option value=""></option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District of Columbia">District of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Guam">Guam</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                    <option value="Armed Forces Americas">Armed Forces Americas</option>
                    <option value="Armed Forces Europe">Armed Forces Europe</option>
                    <option value="Armed Forces Pacific">Armed Forces Pacific</option>
                  </select>
                  <label className="gform-field-label gform-field-label--type-sub" htmlFor="businessState">State</label>
                </span>
                <span className="ginput_left address_zip ginput_address_zip gform-grid-col" style={{paddingInline: 0}}>
                  <input
                    type="text"
                    id="businessZip"
                    className="large"
                    {...register('businessZip', { required: true })}
                  />
                  <label className="gform-field-label gform-field-label--type-sub" htmlFor="businessZip">ZIP Code</label>
                </span>
                {(errors.businessAddress || errors.businessCity || errors.businessState || errors.businessZip) && (
                  <span className="gfield_description validation_message">This field is required</span>
                )}
              </div>
            </div>

            <div className="gfield gfield--type-email gfield--width-half gfield--has-description">
              <label className="gfield_label gform-field-label" htmlFor="email">
                Email <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_email">
                <input
                  type="email"
                  id="email"
                  className="large"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
              </div>
              <div className="gfield_description" id="gfield_description_email">example@example.com</div>
              {errors.email && <span className="gfield_description validation_message">Please enter a valid email</span>}
            </div>

            <div className="gfield gfield--type-phone gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="phone">
                Phone
              </label>
              <div className="ginput_container ginput_container_phone">
                <InputMask
                  mask="(999) 999-9999"
                  {...register('phone')}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="tel"
                      id="phone"
                      className="large"
                    />
                  )}
                </InputMask>
              </div>
            </div>

            <div className="gfield gfield--type-phone gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="mobile">
                Mobile
              </label>
              <div className="ginput_container ginput_container_phone">
                <InputMask
                  mask="(999) 999-9999"
                  {...register('mobile')}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="tel"
                      id="mobile"
                      className="large"
                    />
                  )}
                </InputMask>
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="productService">
                Product / Service Sold
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="productService"
                  className="large"
                  {...register('productService')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-radio gfield--width-half">
              <label className="gfield_label gform-field-label">
                Partnership <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_radio">
                <div className="gfield_radio">
                  <div className="gchoice gchoice_1">
                    <input
                      type="radio"
                      value="Corp"
                      id="partnership_1"
                      {...register('partnership', { required: true })}
                    />
                    <label htmlFor="partnership_1"> Corp</label>
                  </div>
                  <div className="gchoice gchoice_2">
                    <input
                      type="radio"
                      value="Sole Prop"
                      id="partnership_2"
                      {...register('partnership', { required: true })}
                    />
                    <label htmlFor="partnership_2"> Sole Prop</label>
                  </div>
                  <div className="gchoice gchoice_3">
                    <input
                      type="radio"
                      value="LLC"
                      id="partnership_3"
                      {...register('partnership', { required: true })}
                    />
                    <label htmlFor="partnership_3"> LLC</label>
                  </div>
                </div>
                {errors.partnership && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-radio gfield--width-half">
              <label className="gfield_label gform-field-label">
                Business Type <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_radio">
                <div className="gfield_radio">
                  <div className="gchoice gchoice_1">
                    <input
                      type="radio"
                      value="Store Front"
                      id="businessType_1"
                      {...register('businessType', { required: true })}
                    />
                    <label htmlFor="businessType_1"> Store Front</label>
                  </div>
                  <div className="gchoice gchoice_2">
                    <input
                      type="radio"
                      value="Office"
                      id="businessType_2"
                      {...register('businessType', { required: true })}
                    />
                    <label htmlFor="businessType_2"> Office</label>
                  </div>
                  <div className="gchoice gchoice_3">
                    <input
                      type="radio"
                      value="Home"
                      id="businessType_3"
                      {...register('businessType', { required: true })}
                    />
                    <label htmlFor="businessType_3"> Home</label>
                  </div>
                </div>
                {errors.businessType && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-date gfield--input-type-datepicker gfield--datepicker-default-icon gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="dateStarted">
                Date Business Started <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_date">
                <Controller
                  name="dateStarted"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(date: Date | null) => field.onChange(formatDateForSubmit(date))}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="large datepicker gform-datepicker mdy datepicker_with_icon"
                      id="dateStarted"
                    />
                  )}
                />
                {errors.dateStarted && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="ein">
                EIN <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="ein"
                  className="large"
                  {...register('ein', { required: true })}
                />
                {errors.ein && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            {/* Owner #1 Section */}
            <h2 style={{gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px', fontWeight: '900', fontSize: '1.5rem'}}>
              OWNER/PRINCIPLE INFORMATION
              <h3 style={{gridColumn: '1 / -1', fontWeight: '900', fontSize: '1.5rem'}}>OWNER #1</h3>
            </h2>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner1Name">
                Name <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Name"
                  className="large"
                  {...register('owner1Name', { required: true })}
                />
                {errors.owner1Name && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner1Address">
                Address <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Address"
                  className="large"
                  {...register('owner1Address', { required: true })}
                />
                {errors.owner1Address && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1City">
                City <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1City"
                  className="large"
                  {...register('owner1City', { required: true })}
                />
                {errors.owner1City && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1State">
                State <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1State"
                  className="large"
                  {...register('owner1State', { required: true })}
                />
                {errors.owner1State && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Zip">
                Zip <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Zip"
                  className="large"
                  {...register('owner1Zip', { required: true })}
                />
                {errors.owner1Zip && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-phone gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Phone">
                Phone
              </label>
              <div className="ginput_container ginput_container_phone">
                <InputMask
                  mask="(999) 999-9999"
                  {...register('owner1Phone')}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="tel"
                      id="owner1Phone"
                      className="large"
                    />
                  )}
                </InputMask>
              </div>
            </div>

            <div className="gfield gfield--type-email gfield--width-full gfield--has-description">
              <label className="gfield_label gform-field-label" htmlFor="owner1Email">
                Email
              </label>
              <div className="ginput_container ginput_container_email">
                <input
                  type="email"
                  id="owner1Email"
                  className="large"
                  {...register('owner1Email')}
                />
              </div>
              <div className="gfield_description" id="gfield_description_owner1Email">example@example.com</div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Ownership">
                % of Ownership <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Ownership"
                  className="large"
                  {...register('owner1Ownership', { required: true })}
                />
                {errors.owner1Ownership && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-date gfield--input-type-datepicker gfield--datepicker-no-icon gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Dob">
                Date of Birth <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_date">
                <Controller
                  name="owner1Dob"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(date: Date | null) => field.onChange(formatDateForSubmit(date))}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="large datepicker gform-datepicker mdy"
                      id="owner1Dob"
                      maxDate={new Date()}
                    />
                  )}
                />
                {errors.owner1Dob && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Ssn">
                SSN# <span className="gfield_required gfield_required_text">(Required)</span>
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Ssn"
                  className="large"
                  {...register('owner1Ssn', { required: true })}
                />
                {errors.owner1Ssn && <span className="gfield_description validation_message">This field is required</span>}
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner1Credit">
                Credit Score
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1Credit"
                  className="large"
                  {...register('owner1Credit')}
                />
              </div>
            </div>

            {/* Owner #2 Section (Optional) */}
            <h3 style={{gridColumn: '1 / -1', marginTop: '20px', fontWeight: '900', fontSize: '1.5rem'}}>OWNER #2 (IF APPLICABLE)</h3>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner2Name">
                Name
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Name"
                  className="large"
                  {...register('owner2Name')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner2Address">
                Address
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Address"
                  className="large"
                  {...register('owner2Address')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2City">
                City
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2City"
                  className="large"
                  {...register('owner2City')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2State">
                State
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2State"
                  className="large"
                  {...register('owner2State')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Zip">
                Zip
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Zip"
                  className="large"
                  {...register('owner2Zip')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-phone gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Phone">
                Phone
              </label>
              <div className="ginput_container ginput_container_phone">
                <InputMask
                  mask="(999) 999-9999"
                  {...register('owner2Phone')}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="tel"
                      id="owner2Phone"
                      className="large"
                    />
                  )}
                </InputMask>
              </div>
            </div>

            <div className="gfield gfield--type-email gfield--width-full gfield--has-description">
              <label className="gfield_label gform-field-label" htmlFor="owner2Email">
                Email
              </label>
              <div className="ginput_container ginput_container_email">
                <input
                  type="email"
                  id="owner2Email"
                  className="large"
                  {...register('owner2Email')}
                />
              </div>
              <div className="gfield_description" id="gfield_description_owner2Email">example@example.com</div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Ownership">
                % of Ownership
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Ownership"
                  className="large"
                  {...register('owner2Ownership')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-date gfield--input-type-datepicker gfield--datepicker-default-icon gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Dob">
                Date of Birth
              </label>
              <div className="ginput_container ginput_container_date">
                <Controller
                  name="owner2Dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(date: Date | null) => field.onChange(formatDateForSubmit(date))}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="large datepicker gform-datepicker mdy datepicker_with_icon"
                      id="owner2Dob"
                      maxDate={new Date()}
                    />
                  )}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Ssn">
                SSN#
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Ssn"
                  className="large"
                  {...register('owner2Ssn')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="owner2Credit">
                Credit Score
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2Credit"
                  className="large"
                  {...register('owner2Credit')}
                />
              </div>
            </div>

            {/* Financial Information */}
            <h2 style={{gridColumn: '1 / -1', marginTop: '20px',  fontWeight: '900', fontSize: '1.5rem'}}>FINANCIAL INFORMATION</h2>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="fundingAmount">
                Amount of Funding Requesting
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="fundingAmount"
                  className="large"
                  placeholder="Ex. $100,000"
                  {...register('fundingAmount')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="purposeOfFunds">
                Purpose of Funds
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="purposeOfFunds"
                  className="large"
                  {...register('purposeOfFunds')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-radio gfield--width-full">
              <label className="gfield_label gform-field-label">Existing Advances:</label>
              <div className="ginput_container ginput_container_radio">
                <div className="gfield_radio">
                  <div className="gchoice gchoice_1">
                    <input
                      type="radio"
                      value="Yes"
                      id="existingAdvances_1"
                      {...register('existingAdvances')}
                    />
                    <label htmlFor="existingAdvances_1"> Yes</label>
                  </div>
                  <div className="gchoice gchoice_2">
                    <input
                      type="radio"
                      value="No"
                      id="existingAdvances_2"
                      {...register('existingAdvances')}
                    />
                    <label htmlFor="existingAdvances_2"> No</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="firstPositionBalance">
                If yes, what is the remaining balance of the first position
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="firstPositionBalance"
                  className="large"
                  placeholder="Ex. $100,000"
                  {...register('firstPositionBalance')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="firstAdvanceWith">
                Current Advance with
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="firstAdvanceWith"
                  className="large"
                  {...register('firstAdvanceWith')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-half">
              <label className="gfield_label gform-field-label" htmlFor="firstPayment">
                Payment
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="firstPayment"
                  className="large"
                  {...register('firstPayment')}
                />
              </div>
            </div>

            {/* Landlord/Mortgage Information */}
            <h2 style={{gridColumn: '1 / -1', marginTop: '20px', fontWeight: '900', fontSize: '1.5rem' }}>LANDLORD OR MORTGAGE INFORMATION</h2>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="rentMortgageAmount">
                Rent / Mortgage Monthly Amount
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="rentMortgageAmount"
                  className="large"
                  {...register('rentMortgageAmount')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="landlordContact">
                Landlord / Mortgage Contact
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="landlordContact"
                  className="large"
                  {...register('landlordContact')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="landlordNumber">
                Landlord / Mortgage Number
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="landlordNumber"
                  className="large"
                  {...register('landlordNumber')}
                />
              </div>
            </div>

            {/* Signature Section */}
            <h2 style={{gridColumn: '1 / -1', marginTop: '20px', fontWeight: '900', fontSize: '1.5rem'}}>Owner #1</h2>
            <p className="authorization-text" style={{gridColumn: '1 / -1', marginBottom: '20px', fontSize: '15px', fontWeight: '400', lineHeight: '17px'}}>
              By signing below, the Merchant and its owners / principals: (1) certify that all
              information and documents submitted in connection with this Application is true,
              correct and complete; and (2) authorize recipient and its affiliates to receive
              credit reports including credit card processor statements and bank statements, from
              one or more consumer reporting agencies, such as TransUnion, Experian and Equifax,
              and from other credit bureaus, banks, creditors and other third parties regarding
              the Merchant and its owners and principals, to verify any information provided on
              the Application.
            </p>

            <div className="gfield gfield--type-Signature gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner1Signature">
                Owner/Principle Signature
              </label>
              <div className="ginput_container" id="signature_id_owner1">
                <div className="digi_signature_class">
                  <canvas
                    ref={owner1SignatureRef}
                    id="gfds_signature_owner1"
                    className="signature-pad"
                    width="400"
                    height="200"
                    onMouseDown={startDrawing(owner1SignatureRef.current, 'owner1')}
                    onMouseMove={draw(owner1SignatureRef.current, 'owner1')}
                    onMouseUp={stopDrawing('owner1')}
                    onMouseLeave={stopDrawing('owner1')}
                    style={{
                      border: '1px solid #C2C8D4',
                      borderRadius: '4px',
                      backgroundColor: '#d1d1d1',
                      cursor: 'crosshair',
                      width: '400px',
                      height: '200px',
                      display: 'block'
                    }}
                  />
                  <button
                    type="button"
                    className="clearButton"
                    onClick={clearSignature(owner1SignatureRef.current)}
                    style={{
                      marginTop: '8px',
                      padding: '8px 24px',
                      backgroundColor: '#204ce5',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#fff'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner1PrintName">
                Print Name
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner1PrintName"
                  className="large"
                  {...register('owner1PrintName')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-date gfield--input-type-datepicker gfield--datepicker-default-icon gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner1Date">
                Date
              </label>
              <div className="ginput_container ginput_container_date">
                <Controller
                  name="owner1Date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(date: Date | null) => field.onChange(formatDateForSubmit(date))}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="large datepicker gform-datepicker mdy datepicker_with_icon"
                      id="owner1Date"
                      maxDate={new Date()}
                    />
                  )}
                />
              </div>
            </div>

            <h2 style={{gridColumn: '1 / -1', marginTop: '20px', fontWeight: '900', fontSize: '1.5rem'}}>Owner #2</h2>

            <div className="gfield gfield--type-Signature gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner2Signature">
                Owner/Principle Signature
              </label>
              <div className="ginput_container" id="signature_id_owner2">
                <div className="digi_signature_class">
                  <canvas
                    ref={owner2SignatureRef}
                    id="gfds_signature_owner2"
                    className="signature-pad"
                    width="400"
                    height="200"
                    onMouseDown={startDrawing(owner2SignatureRef.current, 'owner2')}
                    onMouseMove={draw(owner2SignatureRef.current, 'owner2')}
                    onMouseUp={stopDrawing('owner2')}
                    onMouseLeave={stopDrawing('owner2')}
                    style={{
                      border: '1px solid #C2C8D4',
                      borderRadius: '4px',
                      backgroundColor: '#d1d1d1',
                      cursor: 'crosshair',
                      width: '400px',
                      height: '200px',
                      display: 'block'
                    }}
                  />
                  <button
                    type="button"
                    className="clearButton"
                    onClick={clearSignature(owner2SignatureRef.current)}
                    style={{
                      marginTop: '8px',
                      padding: '8px 24px',
                      backgroundColor: '#204ce5',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#fff'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="gfield gfield--type-text gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner2PrintName">
                Print Name
              </label>
              <div className="ginput_container ginput_container_text">
                <input
                  type="text"
                  id="owner2PrintName"
                  className="large"
                  {...register('owner2PrintName')}
                />
              </div>
            </div>

            <div className="gfield gfield--type-date gfield--input-type-datepicker gfield--datepicker-default-icon gfield--width-full">
              <label className="gfield_label gform-field-label" htmlFor="owner2Date">
                Date
              </label>
              <div className="ginput_container ginput_container_date">
                <Controller
                  name="owner2Date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(date: Date | null) => field.onChange(formatDateForSubmit(date))}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="large datepicker gform-datepicker mdy datepicker_with_icon"
                      id="owner2Date"
                      maxDate={new Date()}
                    />
                  )}
                />
              </div>
            </div>

            <div className="gfield gfield--type-fileupload gfield--width-full">
              <label className="gfield_label gform-field-label">
                Upload Bank Statements and Month to Date (MTD) Browse Files
              </label>
              <div className="ginput_container ginput_container_fileupload">
                <div
                  className={`dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    padding: '60px 20px',
                    textAlign: 'center',
                    backgroundColor: isDragging ? '#f0f4ff' : '#f9fafb',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", fontSize: '16px', color: '#374151', marginBottom: '0' }}>
                    <Image src="/images/upload-cloud.png" alt="Upload cloud icon" width={48} height={48} style={{ width: '48px', height: '48px' }} />
                    <span style={{fontSize: '14px', fontWeight: 400, marginBottom: '10px'}}>Drop files here or{' '}</span>
                    <button
                      type="button"
                      onClick={handleSelectFilesClick}
                      style={{
                        width: "108px",
                        padding: '10px 10px',
                        backgroundColor: '#204ce5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'inline-block',
                        marginLeft: '4px'
                      }}
                    >
                      Select files
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </div>

                {filesWithProgress.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    {filesWithProgress.map((fileWithProgress) => (
                      <div
                        key={fileWithProgress.id}
                        style={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          padding: '12px 16px',
                          marginBottom: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                              {fileWithProgress.file.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {formatFileSize(fileWithProgress.file.size)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(fileWithProgress.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#dc2626',
                              fontSize: '20px',
                              cursor: 'pointer',
                              lineHeight: '1'
                            }}
                          >
                            ×
                          </button>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div
                            style={{
                              width: `${fileWithProgress.progress}%`,
                              height: '100%',
                              backgroundColor: '#204ce5',
                              transition: 'width 0.2s ease'
                            }}
                          />
                        </div>
                        {fileWithProgress.progress === 100 && (
                          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
                            ✓ Upload complete
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <span className="gfield_description" style={{ display: 'block', marginTop: '8px' }}>
                  Max. file size: 1 GB.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="gform_footer top_label">
          <button type="submit" className="gform_button button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
