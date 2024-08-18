import initTranslations from "@/lib/i18n";

export default async function Home({
	params: { locale },
}: { params: { locale: string } }) {
	const { t } = await initTranslations({ locale });

	return <h1>{t("pizza")}</h1>;
}
