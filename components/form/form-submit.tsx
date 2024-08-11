'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = 'primary',
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type='submit'
      variant={variant}
      size='sm'
      className={cn(className, 'relative')}
    >
      {pending && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      )}
      <span className={cn(pending && 'invisible')}>{children}</span>
    </Button>
  )
}
