import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/utils";

export async function POST(request: NextRequest) {
    const { name, email, password, username } = await request.json();
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });
    if (existingUser) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            username,
        },
    });
    return NextResponse.json({ user });
}

export async function GET(request: NextRequest) {
    return NextResponse.json(request.body);
}
