'use client'

import { Input } from "@/components/ui/input"
import { useFormStatus } from "react-dom"

interface FormInputProps {
    errors?:{
        title?:string[],
    }
}

export const FormInput = ({errors}: FormInputProps) => {
    const {pending} = useFormStatus()
  return (
    <div className=''>
      <Input
        id='title'
        name='title'
        required
        disabled={pending}
        placeholder='Enter a board title'
        
      />
      {errors?.title && (
          <div className='text-red-500'>
            {errors.title.map((error: string) => (
              <p key={error} className='text-rose-500'>
                {error}
              </p>
            ))}
          </div>
        )}
    </div>
  )
}
