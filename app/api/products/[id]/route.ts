import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  console.log(id);
  try {
    await connectDB();
    const productList = await Product.findById(id);
    if (!productList) {
      return NextResponse.json(
        { message: "No Product found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Product list fetched successfully",
      status: 200,
      productList,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  try {
    const body = await req.json();
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json({
      message: "Product updated successfully",
      status: 200,
      updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  try {
    await connectDB();
    const deleteProduct = await Product.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
      deleteProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
