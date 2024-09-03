import { z } from "zod";

export const passwordSchema = z.string().min(4, { message: "auth.validation.password" });

export const formLoginSchema = z.object({
	email: z.string().email({ message: "auth.validation.email" }),
	password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: "auth.validation.full_name" }),
			confirmPassword: passwordSchema,
		}),
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: "auth.validation.confirm_password",
		path: ["confirmPassword"],
	});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
