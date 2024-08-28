"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Skeleton } from "@/components/shared/ui";

import { FilterCheckbox } from "../FilterCheckbox";
import type { CheckboxFiltersGroupProps } from "../../model/props";

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
	title,
	name,
	items,
	limit = 5,
	searchInputPlaceholderKey = "filter.searchPlaceholder",
	isLoading = false,
	className,
	onClickCheckbox,
	selected,
}) => {
	const { t } = useTranslation();
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const onChangeSearchInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(ev.target.value);
	};

	if (isLoading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className="h-6 mb-4" />)}

				<Skeleton className="w-28 h-6 mb-4" />
			</div>
		);
	}

	const list = showAll
		? items.filter((item) =>
				item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
			)
		: items.slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			<div
				className={`transition-all duration-300 ${showAll ? "mb-5" : "mb-0"}`}
			>
				<Input
					placeholder={t(searchInputPlaceholderKey)}
					value={searchValue}
					onChange={onChangeSearchInput}
					className={`bg-gray-50 border-none transition-all duration-300 ${showAll ? "h-10 opacity-100" : "h-0 opacity-0 p-0"}`}
				/>
			</div>

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item) => (
					<FilterCheckbox
						key={item.value}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div
					className={`mt-4 transition-all duration-500 border-t-neutral-100 ${showAll ? "border-t" : "border-t-0"}`}
				>
					<button
						type="button"
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-3"
					>
						{showAll ? t("filter.hide") : `+ ${t("filter.showAll")}`}
					</button>
				</div>
			)}
		</div>
	);
};
