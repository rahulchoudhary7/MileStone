'use client'

import { create, State } from '@/actions/create-board' // Adjust the import path as needed
import { Button } from '@/components/ui/button'

import { useFormState } from 'react-dom'
import { FormInput } from './form-input'
import { FormButton } from './form-button'

export const Form = () => {
  const initialState: State = { message: null, errors: {} }
  const [state, dispatch] = useFormState<State, FormData>(create, initialState)

  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  )
}
