import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (users.length === 0) {
      return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
      { id: newUser.id }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, email, password } = await request.json();

    if (!id || !name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 },
      { data: existingUser.id }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      throw new Error("User ID is required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User with this ID does not exist");
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
      { data: id }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
