import { Suspense } from "react";
import { Container } from "@/components/shared/ui";
import { Header } from "@/components/widgets/header";

export default function CheckoutLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="h-screen flex flex-col">
			<Suspense>
				<Header hasSearch={false} />
			</Suspense>
			<main className="flex-grow relative overflow-y-auto">
				<Container>{children}</Container>
			</main>
		</div>
	);
}
