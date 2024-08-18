"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { i18nConfig } from "@/config/i18next.config";
import { Languages } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "@/components/shared/ui";

export const LanguageButton: FC = () => {
	const { t, i18n } = useTranslation("languages");
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (value: string) => {
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = date.toUTCString();
		document.cookie = `NEXT_LOCALE=${value};expires=${expires};path=/`;

		if (currentLocale === i18nConfig.defaultLocale) {
			router.push(`/${value}${currentPathname}`);
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${value}`));
		}

		router.refresh();
	};

	return (
		<Select onValueChange={handleChange} value={currentLocale}>
			<SelectTrigger className="border-0 text-primary">
				<Languages />
			</SelectTrigger>
			<SelectContent className="text-primary">
				<SelectGroup>
					<SelectItem className="focus:text-primary cursor-pointer" value="en">
						{t("en")}
					</SelectItem>
					<SelectItem className="focus:text-primary cursor-pointer" value="uk">
						{t("uk")}
					</SelectItem>
					<SelectItem className="focus:text-primary cursor-pointer" value="ru">
						{t("ru")}
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
