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
import { Root as VisuallyHidden} from "@radix-ui/react-visually-hidden";
 
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
					"p-3 lg:p-0 w-full h-full max-w-full max-h-full bg-white overflow-y-auto sm:max-w-[1060px] sm:min-h-[500px] sm:h-auto",
					className,
				)}
			>
				<VisuallyHidden>
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
				</VisuallyHidden>
				<ProductForm
					isPizza={isPizza}
					product={product}
					onSubmit={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	);
};
