import { z } from 'zod'

export const CreateCard = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(2, {
      message: 'Card title must be at least 2 characters long',
    }),

  boardId: z.string(),
  listId: z.string(),
})
