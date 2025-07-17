import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { nanoIdFormat } from "@/lib/utils/nanoId";
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullname, email, password } = body;
        console.log("Registering user:", { fullname, email });

        if (!fullname || !email || !password) {
            return NextResponse.json(
                { message: "Semua field wajib diisi!" },
                { status: 400 }
            );
        }

        const existUser = await prisma.users.findUnique({ where: { email } });

        if (existUser) {
            return NextResponse.json(
                { message: "Email sudah terdaftar" },
                { status: 400 }
            );
        }

        const hashedPw = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                id: await nanoIdFormat("UID", 10),
                fullname,
                email,
                password: hashedPw
            }
        });

        return NextResponse.json({ message: "User created", user: newUser }, { status: 201 })
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Server error!" }, { status: 500 });
    }
}