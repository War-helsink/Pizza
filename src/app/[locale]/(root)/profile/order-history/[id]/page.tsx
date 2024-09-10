import type { Metadata } from "next";
import type { Locale } from "@prisma/client";

import initTranslations from "@/libs/i18n";
import { redirect } from "next/navigation";
import { getUserSession } from "@/libs/get-user-session";
import { getOrder } from "@/libs/api";
import { ProfileOrder } from "@/components/widgets/profile";
import {
	Container,
	Title,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/shared/ui";

import { SignOut } from "@/components/features/auth";

export async function generateMetadata({
	params: { locale, id },
}: { params: { locale: Locale; id: string } }): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		title: t("metadata:title.profile.order", { id }),
		description: t("metadata:description.profile.order", { id }),
	};
}

export default async function ProfileOrderPage({
	params: { locale, id },
}: { params: { locale: Locale; id: string } }) {
	const session = await getUserSession();

	if (!session) {
		return redirect("/not-auth");
	}

	const { t: translation } = await initTranslations({ locale });
	const order = await getOrder(Number(id), Number(session.id));

	if (!order) {
		return redirect("/not-auth");
	}

	return (
		<Container className="my-10 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">
								{translation("profile.nav.home")}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className="cursor-pointer">
								{translation("profile.nav.specialOffice")}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/profile/order-history">
								{translation("profile.title.order-history")}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{translation("profile.title.order", { id })}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<SignOut />
			</div>
			<Title
				size="md"
				className="font-bold"
				text={translation("profile.title.order", { id })}
			/>
			<ProfileOrder locale={locale} order={order} translation={translation} />
		</Container>
	);
}
