"use client";

import { cn } from "@/libs/utils";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shared/ui";

import type { SortPopupProps } from "../../model/props";

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
	const { t } = useTranslation();

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

					<b className="text-primary">{t("sort.popular")}</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[240px]">
				<ul className="*:rounded-md *:cursor-pointer *:px-4">
					<li className="hover:bg-secondary hover:text-primary p-2">
						{t("sort.sortByPopular")}
					</li>
					<li className="hover:bg-secondary hover:text-primary p-2">
						{t("sort.sortByCheap")}
					</li>
					<li className="hover:bg-secondary hover:text-primary p-2">
						{t("sort.sortByExpensive")}
					</li>
					<li className="hover:bg-secondary hover:text-primary p-2">
						{t("sort.sortByRating")}
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
};
