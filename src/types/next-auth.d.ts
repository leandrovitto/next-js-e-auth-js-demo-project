import type { Role } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		id: string;
		user: DefaultUser & {
			role: Role;
		};
	}

	interface User {
		id: string;
		role: Role;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: Role;
	}
}
