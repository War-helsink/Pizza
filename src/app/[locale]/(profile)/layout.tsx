import { Suspense } from "react";
import { Container } from "@/components/shared/ui";
import { Header } from "@/components/widgets/header";

export default async function ProfileLayout({
	children,
}: React.PropsWithChildren) {
	return (
		<>
			<Suspense>
				<Header hasSearch={false} />
			</Suspense>
			<main className="flex-grow relative overflow-y-auto">
				<Container>{children}</Container>
			</main>
		</>
	);
}
