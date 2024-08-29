import { useTranslation } from "react-i18next";
import type { PizzaSize, PizzaType } from "@/config/pizza";
import { getCartItemDetails } from "@/libs/get-cart-item-details";
import {
	CheckoutItem,
	CheckoutItemSkeleton,
} from "@/components/entities/checkout";
import { WhiteBlock } from "@/components/shared/ui";

import type { CheckoutCartProps } from "../../model/props";

export const CheckoutCart: React.FC<CheckoutCartProps> = ({
	items,
	onClickCountButton,
	removeCartItem,
	isLoading,
	className,
}) => {
	const { t } = useTranslation();

	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{isLoading
					? [...Array(4)].map((_, index) => (
							<CheckoutItemSkeleton key={index} />
						))
					: items.map((item) => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									t,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						))}
			</div>
		</WhiteBlock>
	);
};
