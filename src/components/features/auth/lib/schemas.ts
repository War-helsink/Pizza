import { z } from "zod";

export const passwordSchema = z
	.string()
	.min(4, { message: "auth.validation.password" });

export const formLoginSchema = z.object({
	email: z.string().email({ message: "auth.validation.email" }),
	password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			firstName: z.string().min(2, { message: "auth.validation.firstName" }),
			confirmPassword: passwordSchema,
		}),
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: "auth.validation.confirmPassword",
		path: ["confirmPassword"],
	});

export const formUpdateSchema = z.object({
	firstName: z.string(),
	secondName: z.string(),
	lastName: z.string(),
	email: z.string().email({ message: "auth.validation.email" }),
	phone: z.string(),
});

export const formPasswordSchema = z
	.object({
		password: passwordSchema,
		newPassword: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "auth.validation.confirmPassword",
		path: ["confirmPassword"],
	});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormUpdateValues = z.infer<typeof formUpdateSchema>;
export type TFormPasswordValues = z.infer<typeof formPasswordSchema>;
