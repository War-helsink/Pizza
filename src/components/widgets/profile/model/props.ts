import type { User } from "@/@types/entities";

export interface ProfileFormProps {
	user: User;
}

export interface ProfileTabsProps {
	user: User;
}

export interface ProfileOrderProps {
	userId: number;
}
