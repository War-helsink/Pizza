"use client";

import { useEffect, useState } from "react";
import { useSet } from "react-use";

import { FilterCheckbox } from "../FilterCheckbox";
import { Input } from "@/components/shared/ui";

import type { CheckboxFiltersGroupProps } from "../../model/props";

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
	title,
	items,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	className,
	onChange,
	defaultValue,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [selected, { add, toggle }] = useSet<string>(new Set([]));

	const onCheckedChange = (value: string) => {
		toggle(value);
	};

	const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(ev.target.value);
	};

	useEffect(() => {
		if (defaultValue) {
			defaultValue.forEach(add);
		}
	}, [defaultValue, add]);

	useEffect(() => {
		onChange?.(Array.from(selected));
	}, [selected, onChange]);

	const list = showAll
		? items.filter((item) =>
				item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
			)
		: items.slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			<div className="mb-5">
				<Input
					placeholder={searchInputPlaceholder}
					value={searchValue}
					onChange={onSearchChange}
					className={`bg-gray-50 border-none transition-all duration-300 ${showAll ? "h-10 opacity-100" : "h-0 opacity-0"}`}
				/>
			</div>

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item) => (
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
				<div
					className={`mt-4 transition-all duration-500 border-t-neutral-100 ${showAll ? "border-t" : "border-t-0"}`}
				>
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
