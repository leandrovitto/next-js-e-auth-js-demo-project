import { sendVerificationRequest } from "@/lib/sendVerificationRequest";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

type SessionCustom = Session & {
	nationality: string;
	user: User & {
		role: string;
	};
};

export const authOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GitHubProvider({
			clientId: process.env.AUTH_GITHUB_ID as string,
			clientSecret: process.env.AUTH_GITHUB_SECRET as string,
			allowDangerousEmailAccountLinking: true,
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					role: profile.role,
				};
			},
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
			sendVerificationRequest,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			console.log("session", session);
			const sessionCustom: SessionCustom = session as unknown as SessionCustom;
			sessionCustom.nationality = "Canadian";
			sessionCustom.user.role = user.role;
			return sessionCustom;
		},
	},
	pages: {
		signIn: "/login",
	},
} satisfies NextAuthOptions;
