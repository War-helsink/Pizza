"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/libs/utils";
import { Title, Button } from "@/components/shared/ui";

import type { ChooseProductFormProps } from "../../model/props";

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
	name,
	imageUrl,
	price,
	onSubmit,
	className,
	loading,
}) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, "flex flex-1")}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img
					src={imageUrl}
					alt={name}
					loading="lazy"
					className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
				/>
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					{t("product.addCartPrice", { price })}
				</Button>
			</div>
		</div>
	);
};
