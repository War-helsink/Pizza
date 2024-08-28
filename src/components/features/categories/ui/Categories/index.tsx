"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { useAppSelector } from "@/components/app/store";

import type { CategoriesProps } from "../../model/props";

export const Categories: React.FC<CategoriesProps> = ({
	className,
	categories,
}) => {
	const categoryId = useAppSelector((state) => state.category.categoryId);

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
				>
					{category.name}
				</Link>
			))}
		</div>
	);
};
