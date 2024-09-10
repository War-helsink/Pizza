"use client";

import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CountButton } from "@/components/shared/ui";

import type { CheckoutItemProps } from "../../model/props";

export const CheckoutItem: React.FC<CheckoutItemProps> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickRemove,
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={cn(
				"flex items-center justify-between",
				{
					"opacity-50 pointer-events-none": disabled,
				},
				className,
			)}
		>
			<div className="flex items-center gap-5 flex-1">
				<img className="w-[60px] h-[60px]" src={imageUrl} loading="lazy" />

				<div>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
					</div>
					{details && (
						<p className="text-xs text-gray-400 w-[90%]">{details}</p>
					)}
				</div>
			</div>

			<h2 className="font-bold">
				{price} {t("product.currency")}
			</h2>

			<div className="flex items-center gap-5 ml-20">
				<CountButton onClick={onClickCountButton} value={quantity} />
				<button type="button" onClick={onClickRemove}>
					<X
						className="text-gray-400 cursor-pointer hover:text-gray-600"
						size={20}
					/>
				</button>
			</div>
		</div>
	);
};
