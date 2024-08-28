"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/ui";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { ProductForm } from "@/components/entities/products";

import type { ChooseProductModalProps } from "../../model/props";

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
	product,
	className,
}) => {
	const router = useRouter();
	const { t } = useTranslation();
	const isPizza = Boolean(
		"items" in product ? product.items[0].pizzaType : false,
	);

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					className,
				)}
			>
				<VisuallyHidden.Root>
					<DialogHeader>
						<DialogTitle>
							{isPizza
								? t("metadata:title.pizza", {
										productName: product.name,
									})
								: t("metadata:title.product", {
										productName: product.name,
									})}
						</DialogTitle>
						<DialogDescription>
							{isPizza
								? t("metadata:description.pizza", {
										productName: product.name,
									})
								: t("metadata:description.product", {
										productName: product.name,
									})}
						</DialogDescription>
					</DialogHeader>
				</VisuallyHidden.Root>
				<ProductForm
					isPizza={isPizza}
					product={product}
					onSubmit={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	);
};
