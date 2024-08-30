import type { TFunction } from "i18next";
import { z } from "zod";

export const checkoutFormSchemaFn = (
	translation: TFunction<"translation", undefined>,
) => {
	return z.object({
		firstName: z
			.string()
			.min(2, { message: translation("message.firstName.minLength") }),
		lastName: z
			.string()
			.min(2, { message: translation("message.lastName.minLength") }),
		email: z.string().email({ message: translation("message.email.invalid") }),
		phone: z
			.string()
			.min(10, { message: translation("message.phone.invalid") }),
		address: z
			.string()
			.min(5, { message: translation("message.address.invalid") }),
		comment: z.string().optional(),
	});
};

export type CheckoutFormSchemaZod = ReturnType<typeof checkoutFormSchemaFn>;

export type CheckoutFormValues = z.infer<CheckoutFormSchemaZod>;