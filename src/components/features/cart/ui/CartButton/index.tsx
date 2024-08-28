"use client";

import { cn } from "@/libs/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/shared/ui";
// import { useCartStore } from "@/shared/store";

import { Cart } from "../Cart";
import type { CartButtonProps } from "../../model/props";

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
	const totalAmount = 100;
	const items = [];
	const loading = false;

	// const [totalAmount, items, loading] = useCartStore((state) => [
	// 	state.totalAmount,
	// 	state.items,
	// 	state.loading,
	// ]);

	return (
		<Cart>
			<Button
				loading={loading}
				className={cn("group relative", { "w-[105px]": loading }, className)}
			>
				<b>{totalAmount} ₽</b>
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
