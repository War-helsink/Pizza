"use client";

import { useTranslation } from "react-i18next";
import {
	CheckboxFiltersGroup,
} from "@/components/entities/filters";
import { useGetIngredientsQuery } from "@/components/entities/ingredients";
import { useFilters, useQueryFilters } from "@/hooks";
import { Input, Title, RangeSlider } from "@/components/shared/ui";

import type { FiltersProps } from "../../model/props";

export const Filters: React.FC<FiltersProps> = ({ className }) => {
	const filters = useFilters();
	const { data: ingredients, isLoading } = useGetIngredientsQuery(null);
	const { t } = useTranslation();

	useQueryFilters(filters);

	const items = ingredients?.map((item) => ({
		value: String(item.id),
		text: item.name,
	}));

	const updatePrices = (prices: number[]) => {
		filters.setPrices("priceFrom", prices[0]);
		filters.setPrices("priceTo", prices[1]);
	};

	return (
		<div className={className}>
			<Title text={t("filter.title")} size="sm" className="mb-5 font-bold" />

			<CheckboxFiltersGroup
				title={t("filter.pizzaTypes")}
				name="pizzaTypes"
				className="mb-5"
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: t("product.thinCrust"), value: "1" },
					{ text: t("product.traditional"), value: "2" },
				]}
			/>

			<CheckboxFiltersGroup
				title={t("filter.sizes.name")}
				name="sizes"
				className="mb-5"
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: t("filter.sizes.small"), value: "20" },
					{ text: t("filter.sizes.medium"), value: "30" },
					{ text: t("filter.sizes.large"), value: "40" },
				]}
			/>
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">{t("filter.priceRange")}</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={filters.prices.priceFrom}
						onChange={(e) =>
							filters.setPrices("priceFrom", Number(e.target.value))
						}
					/>
					<Input
						type="number"
						min={100}
						max={1000}
						placeholder="1000"
						value={filters.prices.priceTo}
						onChange={(e) =>
							filters.setPrices("priceTo", Number(e.target.value))
						}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				className="mt-5"
				title={t("filter.ingredients")}
				name="ingredients"
				limit={6}
				items={items ? items : []}
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
				isLoading={isLoading}
			/>
		</div>
	);
};
