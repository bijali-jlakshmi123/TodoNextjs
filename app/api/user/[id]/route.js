import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const userId = Number(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Valid User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  const { id } = await context.params;

  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const { name, email, password } = await request.json();

  const data = {
    name,
    email,
    ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
  };

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  return NextResponse.json({
    message: "User updated successfully",
    success: true,
  });
}

export async function DELETE(request, context) {
  const { id } = await context.params;

  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({ success: true });
}
