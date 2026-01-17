import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Product } from "@/models/Product";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connectDB();

    const product = await Product.create(body);

    return NextResponse.json({
      message: "Data saved successfully into database",
      status: 201,
      product,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const productList = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    if (!productList) {
      return NextResponse.json({ message: "No product found", status: 404 });
    }
    return NextResponse.json({
      message: "all products fetched successfully",
      productList,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
