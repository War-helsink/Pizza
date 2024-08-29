"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import {
	CheckoutCart,
	CheckoutSidebar,
	CheckoutAddressForm,
	CheckoutPersonalForm,
} from "@/components/features/checkout";
import { Container, Title } from "@/components/shared/ui";
import { useCart } from "@/hooks";

import {
	type CheckoutFormValues,
	checkoutFormSchema,
} from "@/config/checkout-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckoutPage() {
	const { t } = useTranslation();
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, isLoading } =
		useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			// const url = await createOrder(data);

			console.log("data: ", data);

			toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
				icon: "✅",
			});

			// if (url) {
			// 	location.href = url;
			// }
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error("Не удалось создать заказ", {
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
		<Container className="mt-10">
			<Title
				text={t("checkout.title")}
				className="font-extrabold mb-8 text-[36px]"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
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

						<div className="w-[450px]">
							<CheckoutSidebar
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
