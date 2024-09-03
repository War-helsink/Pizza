import { z } from "zod";

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, { message: "message.firstName.minLength" }),
	lastName: z.string().min(2, { message: "message.lastName.minLength" }),
	email: z.string().email({ message: "message.email.invalid" }),
	phone: z.string().min(10, { message: "message.phone.invalid" }),
	address: z.object({
		cityRef: z.string().min(5, { message: "message.address.invalidCity" }),
		warehouseRef: z
			.string()
			.min(5, { message: "message.address.invalidWarehouse" }),
	}),
	comment: z.string().optional(),
	totalPrice: z.number(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
