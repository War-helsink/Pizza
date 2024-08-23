import type { FC } from "react";

import { cn } from "@/libs/utils";

import { Categories } from "@/components/features/categories";
import { SortPopup } from "@/components/features/sort";
import { Container } from "@/components/shared/ui";

import type { TopBarProps } from "../../model/props";

export const TopBar: FC<TopBarProps> = ({ className }) => {
	return (
		<div
			className={cn(
				"sticky top-0 z-50 bg-white py-5 shadow-lg shadow-black/5",
				className,
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories />
				<SortPopup />
			</Container>
		</div>
	);
};
