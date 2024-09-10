import type { TFunction } from "i18next";
import type { User } from "@/@types/entities";
import type { Order } from "@prisma/client";
import type { Locale } from "@prisma/client";

export interface ProfileAccountFormProps {
	user: User;
}

export interface ProfileOrderHistoryProps {
	translation: TFunction;
	userId: number;
	page?: string;
}

export interface ProfileOrderProps {
	translation: TFunction;
	locale: Locale;
	order: Order;
}
