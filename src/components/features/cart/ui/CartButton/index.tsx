"use client";

import { cn } from "@/libs/utils";
import { useTranslation } from "react-i18next";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks";

import { Button } from "@/components/shared/ui";

import { Cart } from "../Cart";
import type { CartButtonProps } from "../../model/props";

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
	const { items, totalAmount, isLoading } = useCart();
	const { t } = useTranslation();

	return (
		<Cart>
			<Button className={cn("group relative", className)} isLoading={isLoading}>
				<b>
					{totalAmount} {t("product.currency")}
				</b>
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart size={16} className="relative" strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight
					size={20}
					className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
				/>
			</Button>
		</Cart>
	);
};
