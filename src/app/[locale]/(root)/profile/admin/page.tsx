import type { Metadata } from "next";
import type { Locale } from "@prisma/client";

import initTranslations from "@/libs/i18n";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/libs/get-user-session";
import { Container, Title } from "@/components/shared/ui";

export async function generateMetadata({
	params: { locale },
}: { params: { locale: Locale } }): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		title: t("metadata:title.profile.admin"),
		description: t("metadata:description.profile.admin"),
	};
}

export default async function ProfileAdminPage({
	params: { locale },
}: { params: { locale: Locale } }) {
	const session = await getUserSession();

	if (!session) {
		return redirect("/not-auth");
	}

	const user = await prisma.user.findUnique({
		where: { id: Number(session.id) },
	});

	if (!user) {
		return redirect("/not-auth");
	}

	if (user.role !== "ADMIN") {
		return redirect("/profile/order-history");
	}

	const { t: translation } = await initTranslations({ locale });

	return (
		<Container className="my-10 flex flex-col gap-4">
			<Title
				size="md"
				className="font-bold"
				text={translation("profile.title.admin")}
			/>
		</Container>
	);
}
