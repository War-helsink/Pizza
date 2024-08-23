import type { UserRole } from "@/components/shared/types";

export interface User {
	id: number;
	fullName: string;
	phone: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserParams {
	fullName: string;
	phone: string;
	password: string;
}
