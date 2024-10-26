"use client";

import { cn } from "@/libs/utils";
import { ArrowUpDown } from "lucide-react";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shared/ui";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import type { SortPopupProps } from "../../model/props";

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
	const [sort, setSort] = useState("popular");
	const { t } = useTranslation();

	const sorts = [
		{
			label: "sort.sortByPopular",
			value: "popular",
		},
		{
			label: "sort.sortByCheap",
			value: "sortByCheap",
		},
		{
			label: "sort.sortByExpensive",
			value: "sortByExpensive",
		},
		{
			label: "sort.sortByRating",
			value: "sortByRating",
		},
	];

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className={cn(
						"inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
						className,
					)}
				>
					<ArrowUpDown className="w-4 h-4" />
					<b>{t("sort.label")}</b>

					<b className="text-primary">{t(`sort.${sort}`)}</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[240px]">
				<ul>
					{sorts.map((item) => (
						<li
							key={item.value}
							className={cn(
								"hover:bg-secondary hover:text-primary rounded-md cursor-pointer ",
								{
									"bg-secondary text-primary": item.value === sort,
								},
							)}
						>
							<PopoverClose
								onClick={() => setSort(item.value)}
								className="w-full h-full px-4 py-2 focus-visible:outline-none"
							>
								{t(item.label)}
							</PopoverClose>
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};
