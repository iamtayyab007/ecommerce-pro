import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "All fields required",
        status: 400,
      });
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      message: "Registration failed",
      status: 500,
    });
  }
}
