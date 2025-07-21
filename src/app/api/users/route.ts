import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch users!" }, { status: 500 });
    }
}