"use client";

import type { Locale } from "@/@types/prisma";
import type { Resource } from "i18next";

import { Toaster } from "react-hot-toast";
import { TranslationsProvider } from "@/components/app/providers/TranslationsProvider";
import { StoreProvider } from "@/components/app/providers/StoreProvider";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export interface ProvidersProps extends React.PropsWithChildren {
	locale: Locale;
	resources: Resource;
}

export const Providers: React.FC<ProvidersProps> = ({
	children,
	locale,
	resources,
}) => {
	return (
		<>
			<SessionProvider>
				<StoreProvider>
					<TranslationsProvider locale={locale} resources={resources}>
						{children}
					</TranslationsProvider>
				</StoreProvider>
			</SessionProvider>
			<NextTopLoader showSpinner={false} />
			<Toaster />
		</>
	);
};
