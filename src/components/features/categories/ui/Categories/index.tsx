"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/components/app/store";
import {
	setCategoryId,
	useGetCategoriesQuery,
} from "@/components/entities/categories";

import type { CategoriesProps } from "../../model/props";

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
	useGetCategoriesQuery(null);
	const { categories, categoryId } = useAppSelector((state) => state.category);
	const dispatch = useAppDispatch();

	return (
		<div
			className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
		>
			{categories.map((category) => (
				<Link
					key={category.key}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						categoryId === category.id &&
							"bg-white shadow-md shadow-gray-200 text-primary",
					)}
					href={`#${category.id}`}
					onClick={() => dispatch(setCategoryId(category.id))}
				>
					{category.name}
				</Link>
			))}
		</div>
	);
};
