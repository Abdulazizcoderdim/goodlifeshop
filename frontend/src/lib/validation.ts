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

export const privateUserSchema = z.object({
  firstName: z.string().min(3, { message: "Это поле обязательное" }),
  lastName: z.string().min(3, { message: "Это поле обязательное" }),
  surname: z.string().min(3, { message: "Это поле обязательное" }),
  phoneNumber: z.string(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(4, { message: "Это поле обязательное" }),
  newPassword: z.string().min(4, { message: "Это поле обязательное" }),
});
export const subscribeShema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  agree: z.boolean(),
});

export type SubscribeValues = z.infer<typeof subscribeShema>;

export type PrivateUserValues = z.infer<typeof privateUserSchema>;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
