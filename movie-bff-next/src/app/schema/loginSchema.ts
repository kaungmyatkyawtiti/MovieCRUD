import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username required' }),
  password: z
    .string()
    .min(2, { message: 'Password required' }),
})

export type LoginFormValue = z.infer<typeof loginSchema>;
