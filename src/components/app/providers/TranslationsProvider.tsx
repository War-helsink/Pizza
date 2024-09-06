"use client";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/libs/i18n";
import { createInstance } from "i18next";
import type { Resource } from "i18next";
import type { Locale } from "@prisma/client";

export interface TranslationsProviderProps extends React.PropsWithChildren {
	locale: Locale;
	resources: Resource;
}

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
	children,
	locale,
	resources,
}) => {
	const i18n = createInstance();

	initTranslations({ locale, i18nInstance: i18n, resources });

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
