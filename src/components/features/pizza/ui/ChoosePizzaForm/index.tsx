"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/libs/utils";
import {
	PizzaImage,
	Title,
	Button,
	GroupVariants,
} from "@/components/shared/ui";
import { type PizzaSize, type PizzaType, pizzaTypes } from "@/config/pizza";

import { IngredientItem } from "@/components/entities/ingredients";
import { getPizzaDetails } from "@/libs/get-pizza-details";
import { usePizzaOptions } from "@/hooks";

import type { ChoosePizzaFormProps } from "../../model/props";

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
	name,
	items,
	imageUrl,
	ingredients,
	isLoading,
	onSubmit,
	className,
}) => {
	const { t } = useTranslation();
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items);

	const { totalPrice, key } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);
	const textDetaills = t("product.textDetaills", { size, name: t(key) });

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit
				? onSubmit(currentItemId, Array.from(selectedIngredients))
				: null;
		}
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetaills}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					isLoading={isLoading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					{t("product.addCartPrice", { price: totalPrice })}
				</Button>
			</div>
		</div>
	);
};
