import { decrypt } from "@/app/lib/session";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = await cookies();
    const cookie_val = cookie.get("session")?.value.toString();

    try {
        const session = await decrypt(cookie_val);

        if (isProtectedRoute && (!session || !session?.userId)) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }

        if (isPublicRoute && session?.userId) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}
