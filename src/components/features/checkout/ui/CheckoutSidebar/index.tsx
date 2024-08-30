"use client";

import { cn } from "@/libs/utils";
import { useTranslation } from "react-i18next";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutItemDetails } from "@/components/entities/checkout";
import { Button, Skeleton, WhiteBlock } from "@/components/shared/ui";

const VAT = 15;
const DELIVERY_PRICE = 250;

import type { CheckoutSidebarProps } from "../../model/props";

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
	totalAmount,
	isLoading,
	className,
}) => {
	const { t } = useTranslation();
	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

	return (
		<WhiteBlock className={cn("p-6 sticky top-4", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">{t("checkout.sidebar.total")}</span>
				{isLoading ? (
					<Skeleton className="h-11 w-48" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">
						{totalPrice} {t("product.currency")}
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						{t("checkout.sidebar.cartPrice")}
					</div>
				}
				value={
					isLoading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${totalAmount} ${t("product.currency")}`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						{t("checkout.sidebar.taxes")}
					</div>
				}
				value={
					isLoading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${vatPrice} ${t("product.currency")}`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						{t("checkout.sidebar.delivery")}
					</div>
				}
				value={
					isLoading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${DELIVERY_PRICE} ${t("product.currency")}`
					)
				}
			/>

			<Button
				isLoading={isLoading}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				{t("checkout.sidebar.proceedToPayment")}
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
