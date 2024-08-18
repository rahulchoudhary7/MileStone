import { forwardRef } from 'react'
import dynamic from 'next/dynamic'
import { Label } from '@/components/ui/label'
import { FormErrors } from './form-errors'
import { useFormStatus } from 'react-dom'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
import 'react-quill/dist/quill.snow.css'

interface FormTextEditorProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
  defaultValue?: string
  onChange?: (content: string) => void
}

export const FormTextEditor = forwardRef<
  HTMLDivElement,
  FormTextEditorProps
>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      defaultValue,
      onChange,
    },
    ref,
  ) => {
    const { pending } = useFormStatus()

    const modules = {
      toolbar: [
        [
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
        ],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
        ['clean'],
      ],
    }

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ]

    return (
      <div className='space-y-2 w-full'>
        <div className='space-y-1 w-full'>
          {label && (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutral-700'
            >
              {label}
            </Label>
          )}

          <ReactQuill
            theme='snow'
            value={defaultValue}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            readOnly={pending || disabled}
            className={`h-40 overflow-y-auto ${className}`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  },
)

FormTextEditor.displayName = 'FormTextEditor'
