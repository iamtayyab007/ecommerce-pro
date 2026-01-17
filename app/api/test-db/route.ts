import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "DB Connected ✅" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
