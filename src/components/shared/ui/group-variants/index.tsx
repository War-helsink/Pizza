"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/libs/utils";

export type Variant = {
	key: string;
	value: string;
	disabled?: boolean;
};

export interface GroupVariantsProps {
	items: readonly Variant[];
	onClick?: (value: Variant["value"]) => void;
	value?: Variant["value"];
	className?: string;
}

export const GroupVariants: React.FC<GroupVariantsProps> = ({
	items,
	onClick,
	className,
	value,
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={cn(
				className,
				"flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none",
			)}
		>
			{items.map((item) => (
				<button
					key={item.key}
					type="button"
					onClick={() => onClick?.(item.value)}
					className={cn(
						"flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
						{
							"bg-white shadow": item.value === value,
							"text-gray-500 opacity-50 pointer-events-none": item.disabled,
						},
					)}
				>
					{t(item.key)}
				</button>
			))}
		</div>
	);
};
