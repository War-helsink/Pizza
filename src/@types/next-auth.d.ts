// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT, DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: UserRole;
			phone: string;
			name: string;
			email: string;
			image: string;
		};
	}

	interface User extends DefaultUser {
		id: number;
		phone: string;
		role: UserRole;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		phone: string;
		role: UserRole;
	}
}
