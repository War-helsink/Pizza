import type { Metadata } from "next";
import type { Locale } from "@prisma/client";

import initTranslations from "@/libs/i18n";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/libs/get-user-session";
import { ProfileTabs } from "@/components/widgets/profile";

export async function generateMetadata({
	params: { locale },
}: { params: { locale: Locale } }): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		title: t("metadata:title.profile"),
		description: t("metadata:description.profile"),
	};
}

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		return redirect("/not-auth");
	}

	const user = await prisma.user.findFirst({
		where: { id: Number(session?.id) },
	});

	if (!user) {
		return redirect("/not-auth");
	}

	return <ProfileTabs user={user} />;
}
