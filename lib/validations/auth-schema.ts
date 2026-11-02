import { z } from "zod";

export const loginSchme = z.object({
  email: z.string().trim().pipe(z.email("email tdak valid")),
  password: z.string().min(6, "minimal 6 karakter"),
});

export type loginInput = z.infer<typeof loginSchme>;
