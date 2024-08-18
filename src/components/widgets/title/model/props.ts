export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface TitleProps {
	size?: TitleSize;
	className?: string;
	text: string;
}
