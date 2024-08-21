"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/components/app/store";
import { setCategoryId } from "@/components/entities/categories";

import type { CategoriesProps } from "../../model/props";

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
	const { categories, categoryId } = useAppSelector((state) => state.category);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	return (
		<div
			className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
		>
			{categories.map((category) => (
				<Link
					key={category}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						categoryId === category &&
							"bg-white shadow-md shadow-gray-200 text-primary",
					)}
					href={`#${category}`}
					onClick={() => dispatch(setCategoryId(category))}
				>
					{t(`categories.${category}`)}
				</Link>
			))}
		</div>
	);
};
