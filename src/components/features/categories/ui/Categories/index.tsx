import { cn } from "@/lib/utils";
import Link from "next/link";

import type { CategoriesProps } from "../../model/props";

const cats = [
	"Пиццы",
	"Комбо",
	"Закуски",
	"Коктейли",
	"Кофе",
	"Напитки",
	"Десерты",
	"Десерты",
];
const activeIndex = 0;

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
	return (
		<div
			className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
		>
			{cats.map((name, i) => (
				<Link
					key={name}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						activeIndex === i &&
							"bg-white shadow-md shadow-gray-200 text-primary",
					)}
					href=""
				>
					{name}
				</Link>
			))}
		</div>
	);
};
