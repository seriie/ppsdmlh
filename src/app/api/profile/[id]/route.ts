import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await prisma.users.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (e: unknown) {
        console.error("Error fetching user:", e);
        return NextResponse.json({ error: "Failed to fetch user!" }, { status: 500 });
    }
}