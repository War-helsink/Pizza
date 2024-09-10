import type { AuthOptions } from "next-auth";
import { cookies } from "next/headers";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import type { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					phone: profile.phone || "",
					image: profile.avatar_url,
					role: "USER" as UserRole,
				};
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const values = {
					email: credentials.email,
				};

				const findUser = await prisma.user.findUnique({
					where: values,
				});

				if (!findUser) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password,
				);

				if (!isPasswordValid) {
					return null;
				}

				if (!findUser.verified) {
					return null;
				}

				return {
					id: findUser.id,
					email: findUser.email,
					phone: findUser.phone,
					name: `${findUser.firstName} ${findUser.secondName} ${findUser.lastName}`,
					role: findUser.role,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				const cookieStore = cookies();

				const findUser = await prisma.user.findUnique({
					where: {
						email: user.email as string,
					},
					include: {
						cart: true,
					},
				});

				if (account?.provider === "credentials") {
					if (!findUser) {
						return false;
					}

					cookieStore.set(
						"cartToken",
						findUser.cart ? findUser.cart.token : "",
					);

					return true;
				}

				if (!user.email) {
					return false;
				}

				if (findUser) {
					cookieStore.set(
						"cartToken",
						findUser.cart ? findUser.cart.token : "",
					);

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						firstName: user.name || `User #${user.id}`,
						lastName: "",
						secondName: "",
						phone: "",
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
					},
				});

				return true;
			} catch (error) {
				console.error("Error [SIGNIN]", error);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token;
			}

			const findUser = await prisma.user.findUnique({
				where: {
					email: token.email,
				},
			});

			if (findUser) {
				token.id = String(findUser.id);
				token.name = `${findUser.firstName} ${findUser.secondName} ${findUser.lastName}`;
				token.email = findUser.email;
				token.phone = findUser.phone;
				token.role = findUser.role;
			}

			return token;
		},
		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.phone = token.phone;
				session.user.role = token.role;
			}

			return session;
		},
	},
};
