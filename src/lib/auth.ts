import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

type SessionCustom = Session & {
	nationality: string;
	user: User & {
		role: string;
		accessToken?: string;
	};
};

export const authOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req): Promise<User | null> {
				try {
					// Make a request to your Express API to get an API token
					const response = await fetch("http://localhost:3002/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(credentials),
					});
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error during authentication:", error);
					return null;
				}
			},
		}),
		/* GitHubProvider({
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
    }), */
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log("jwt  ----->", token);
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			console.log("session  ----->", session);
			console.log("token  ----->", token);
			const sessionCustom: SessionCustom = session as unknown as SessionCustom;
			sessionCustom.nationality = "Canadian";
			if (token.user.accessToken) {
				sessionCustom.user.accessToken = token.user.accessToken;
			}
			if (token.user.role) {
				sessionCustom.user.role = token.user.role;
			}
			return sessionCustom;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
} satisfies NextAuthOptions;
