import { cn } from "@/libs/utils";
import { CountButton } from "@/components/shared/ui";
import { Trash2Icon } from "lucide-react";

import type { CartItemProps } from "../../model/props";

export const CartItem: React.FC<CartItemProps> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemove,
	className,
}) => {
	return (
		<div
			className={cn(
				"flex bg-white p-5 gap-6",
				{
					"opacity-50 pointer-events-none": disabled,
				},
				className,
			)}
		>
			<img className="w-[60px] h-[60px]" src={imageUrl} />

			<div className="flex-1">
				<div>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
					</div>
					{details && (
						<p className="text-xs text-gray-400 w-[90%]">{details}</p>
					)}
				</div>

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton onClick={onClickCountButton} value={quantity} />

					<div className="flex items-center gap-3">
						<h2 className="font-bold">{price} ₽</h2>
						<Trash2Icon
							onClick={onClickRemove}
							className="text-gray-400 cursor-pointer hover:text-gray-600"
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
