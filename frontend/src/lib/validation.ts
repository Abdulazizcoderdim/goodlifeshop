import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(4, { message: "Это поле обязательное" }),
  rememberMe: z.boolean().optional(),
});

export const registerFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(4, { message: "Это поле обязательное" }),
  confirmPassword: z.string().min(4, { message: "Это поле обязательное" }),
  captcha: z.string().min(6, { message: "Это поле обязательное" }),
  privaceAgreement: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy.",
  }),
  term: z.boolean().optional(),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
