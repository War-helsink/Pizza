"use client";

import { cn } from "@/libs/utils";
import { useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Package, Truck } from "lucide-react";
import { CheckoutItemDetails } from "@/components/entities/checkout";
import { Button, Skeleton, WhiteBlock } from "@/components/shared/ui";

import { useLazyGetDeliveryPriceQuery } from "@/components/entities/novaposhta";
import type { CheckoutSidebarProps } from "../../model/props";

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
	control,
	totalAmount,
	isLoading,
	className,
}) => {
	const [trigger] = useLazyGetDeliveryPriceQuery();
	const [deliveryPrice, setDeliveryPrice] = useState(0);
	const { t } = useTranslation();
	const totalPrice = totalAmount + deliveryPrice;

	const address = useWatch({
		control,
		name: "address",
	});

	useEffect(() => {
		if (address.cityRef.trim().length > 0) {
			trigger({
				cityRef: address.cityRef,
				cost: totalAmount,
			})
				.unwrap()
				.then((deliveryPriceObj) => {
					setDeliveryPrice(deliveryPriceObj.Cost);
				})
				.catch(() => {
					setDeliveryPrice(0);
				});
		} else {
			setDeliveryPrice((prev) => {
				if (prev !== 0) {
					return 0;
				}

				return prev;
			});
		}
	}, [address, totalAmount, trigger]);

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
						<Truck size={18} className="mr-2 text-gray-400" />
						{t("checkout.sidebar.delivery")}
					</div>
				}
				value={
					isLoading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${deliveryPrice} ${t("product.currency")}`
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
