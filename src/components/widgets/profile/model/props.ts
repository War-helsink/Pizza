import type { TFunction } from "i18next";
import type { User } from "@/@types/entities";

export interface ProfileAccountFormProps {
	user: User;
}

export interface ProfileOrderHistoryProps {
	translation: TFunction;
	userId: number;
}
