import NextAuth from "next-auth";
import { cookies } from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/config/auth-options";

export async function GET(
	req: NextApiRequest,
	res: NextApiResponse & { params: { nextauth: string[] } },
) {
	return await NextAuth(req, res, authOptions);
}

export async function POST(
	req: NextApiRequest,
	res: NextApiResponse & { params: { nextauth: string[] } },
) {
	if (res.params.nextauth.includes("signout")) {
		const cookieStore = cookies();
		cookieStore.set("cartToken", "", { expires: new Date(0) });
	}

	return await NextAuth(req, res, authOptions);
}
