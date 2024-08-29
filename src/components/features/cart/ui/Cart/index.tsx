"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/libs/utils";
import type { PizzaSize, PizzaType } from "@/config/pizza";
import { CartItem } from "@/components/entities/cart";
import { useCart } from "@/hooks";
import {
	Title,
	Button,
	buttonVariants,
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
} from "@/components/shared/ui";
import { getCartItemDetails } from "@/libs/get-cart-item-details";

export const Cart: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
	const [redirecting, setRedirecting] = useState(false);
	const { t } = useTranslation();

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className="flex flex-col justify-between pb-0 px-0 bg-[#F4F1EE]">
				<SheetHeader className="px-6">
					<SheetTitle>
						{t("cart.title")}{" "}
						<span className="font-bold">
							{items.length} {t("cart.items")}
						</span>
					</SheetTitle>
					<VisuallyHidden>
						<SheetDescription>{t("cart.hiddenDescription")}</SheetDescription>
					</VisuallyHidden>
				</SheetHeader>
				<div
					className={cn(
						"flex flex-col flex-grow overflow-hidden",
						!totalAmount && "justify-center",
					)}
				>
					{!totalAmount && (
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image
								src="/assets/images/empty-box.png"
								alt="Empty cart"
								width={120}
								height={120}
							/>
							<Title
								size="sm"
								text={t("cart.emptyTitle")}
								className="text-center font-bold my-2"
							/>
							<p className="text-center text-neutral-500 mb-5">
								{t("cart.emptyDescription")}
							</p>

							<SheetClose
								className={cn(buttonVariants({ size: "lg" }), "w-56 h-12")}
							>
								<ArrowLeft className="text-base w-5 mr-2" />
								{t("cart.backButton")}
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className="mt-5 flex-grow overflow-y-auto">
								{items.map((item) => (
									<div key={item.id} className="mb-2">
										<CartItem
											id={item.id}
											imageUrl={item.imageUrl}
											details={getCartItemDetails(
												item.ingredients,
												t,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize,
											)}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={(type) =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>

							<SheetFooter className="bg-white p-8">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											{t("cart.total")}
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
										</span>

										<span className="font-bold text-lg">
											{totalAmount} {t("product.currency")}
										</span>
									</div>

									<Link href="/checkout">
										<Button
											onClick={() => setRedirecting(true)}
											isLoading={redirecting}
											type="submit"
											className="w-full h-12 text-base"
										>
											{t("cart.checkoutButton")}
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
