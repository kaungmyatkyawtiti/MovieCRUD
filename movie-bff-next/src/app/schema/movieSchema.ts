import * as z from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' }),
  directorName: z
    .string()
    .min(1, { message: 'Director name is required' }),
  directorPhoneNo: z
    .string()
    .min(10, { message: 'Phone number is required' }),
  year: z
    .coerce.number()
    .min(1900, 'Year is required')
    .max(new Date().getFullYear() + 5),
});

export type MovieFormValue = z.infer<typeof movieSchema>;
