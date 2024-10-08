import { z } from 'zod'

export const CreateList = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(2, {
      message: 'List title must be at least 2 characters long',
    }),

  boardId: z.string(),
})
