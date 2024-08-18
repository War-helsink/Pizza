import clsx from "clsx";
import { createElement } from "react";

import type { TitleProps } from "../../model/props";

export const Title: React.FC<TitleProps> = ({
	text,
	size = "sm",
	className,
}) => {
	const mapTagBySize = {
		xs: "h5",
		sm: "h4",
		md: "h3",
		lg: "h2",
		xl: "h1",
		"2xl": "h1",
	} as const;

	const mapClassNameBySize = {
		xs: "text-[16px] ys-text",
		sm: "text-[22px] ys-text",
		md: "text-[26px] ys-text",
		lg: "text-[32px] ys-display",
		xl: "text-[40px] ys-display",
		"2xl": "text-[48px] ys-display",
	} as const;

	return createElement(
		mapTagBySize[size],
		{ className: clsx(mapClassNameBySize[size], className) },
		text,
	);
};
