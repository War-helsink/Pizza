import type { TFunction } from "i18next";

export interface HeaderProps {
	translation: TFunction;
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}
