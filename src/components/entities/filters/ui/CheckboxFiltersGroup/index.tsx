"use client";

import { useEffect, useState } from "react";
import { useSet } from "react-use";

import { FilterCheckbox } from "../FilterCheckbox";
import { Input } from "@/components/shared/ui";

import type { CheckboxFiltersGroupProps } from "../../model/props";

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	className,
	onChange,
	defaultValue,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [selected, { add, toggle }] = useSet<string>(new Set([]));

	const onCheckedChange = (value: string) => {
		toggle(value);
	};

	useEffect(() => {
		if (defaultValue) {
			defaultValue.forEach(add);
		}
	}, [defaultValue, add]);

	useEffect(() => {
		onChange?.(Array.from(selected));
	}, [selected, onChange]);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{(showAll ? items : defaultItems || items).map((item) => (
					<FilterCheckbox
						onCheckedChange={() => onCheckedChange(item.value)}
						checked={selected.has(item.value)}
						key={String(item.value)}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
					<button
						type="button"
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-3"
					>
						{showAll ? "Скрыть" : "+ Показать все"}
					</button>
				</div>
			)}
		</div>
	);
};
