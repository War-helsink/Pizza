"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/ui";
import { ChevronLeft } from "lucide-react";

import type { PaginationProps } from "../../model/props";

export const Pagination: React.FC<PaginationProps> = ({
	className,
	currentPage = 1,
	pageCount = 1,
}) => {
	return (
		<div className={cn("flex items-center gap-1", className)}>
			<Button
				className="p-0 w-10"
				variant="outline"
				disabled={currentPage === 1}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			<div className="flex gap-1 mx-2">
				{[...Array(pageCount)].map((_, i) => (
					<Button key={i} variant={currentPage === i + 1 ? "default" : "ghost"}>
						{i + 1}
					</Button>
				))}
			</div>

			<Button
				className="p-0 w-10"
				variant="outline"
				disabled={currentPage === pageCount}
			>
				<ChevronLeft className="h-4 w-4 rotate-180" />
			</Button>
		</div>
	);
};