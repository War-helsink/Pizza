import {
	Container,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/ui";

import { SignOut } from "@/components/features/auth";

import { ProfileOrder } from "../ProfileOrder";
import { ProfileForm } from "../ProfileForm";
import type { ProfileTabsProps } from "../../model/props";

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ user }) => {
	return (
		<Container className="my-10">
			<Tabs defaultValue="order" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="order">Order history</TabsTrigger>
					<TabsTrigger value="address">Delivery address</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="order">
					<ProfileOrder userId={user.id} />
				</TabsContent>
				<TabsContent value="address">address</TabsContent>
				<TabsContent value="account">
					<ProfileForm user={user} />
				</TabsContent>
				<TabsContent value="password">
					<SignOut />
				</TabsContent>
			</Tabs>
		</Container>
	);
};
