import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.error("Error fetching user:", e);
    return NextResponse.json({ error: "Failed to fetch user!" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  const body = await request.json();
  const { fullname } = body;

  if (!fullname) {
    return NextResponse.json({ error: "Fullname is required" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: { fullname },
    });

    return NextResponse.json(updatedUser);
  } catch (e) {
    console.error("Error updating user:", e);
    return NextResponse.json({ error: "Failed to update user!" }, { status: 500 });
  }
}
