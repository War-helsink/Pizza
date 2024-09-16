"use client";

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCart } from "@/hooks";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";

import {
	type CheckoutFormValues,
	checkoutFormSchema,
} from "@/config/checkout-form-schema";
import { createOrder } from "@/app/[locale]/actions";
import {
	CheckoutCart,
	CheckoutSidebar,
	CheckoutAddressForm,
	CheckoutPersonalForm,
} from "@/components/features/checkout";
import { Container, Title } from "@/components/shared/ui";

export default function CheckoutPage() {
	const { t } = useTranslation();
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, isLoading } =
		useCart();
	const { data: session } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: {
				cityRef: "",
				warehouseRef: "",
			},
			comment: "",
			totalPrice: 0,
		},
	});

	useEffect(() => {
		if (session?.user) {
			const [firstName, _, lastName] = session.user.name.split(" ");
			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", session.user.email);
			form.setValue("phone", session.user.phone);
		}
	}, [session, form]);

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder({ ...data, totalPrice: totalAmount });

			toast.success(t("toastMessages.success.order"), {
				icon: "✅",
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.error(err);
			setSubmitting(false);
			toast.error(t("toastMessages.error.order"), {
				icon: "❌",
			});
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className="mt-10 px-0">
			<Title
				text={t("checkout.title")}
				className="font-extrabold mb-8 text-[36px]"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col lg:flex-row gap-10">
						<div className="flex flex-col gap-10 flex-1 lg:mb-20">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								isLoading={isLoading}
							/>
							<CheckoutPersonalForm
								className={isLoading ? "opacity-40 pointer-events-none" : ""}
							/>

							<CheckoutAddressForm
								className={isLoading ? "opacity-40 pointer-events-none" : ""}
							/>
						</div>

						<div className="w-full lg:w-[450px] mb-20 lg:mb-0">
							<CheckoutSidebar
								control={form.control}
								totalAmount={totalAmount}
								isLoading={isLoading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
