import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import path from "path";
import fs from "fs";

export const POST = async (req: Request) => {
  try {
    // const body = await req.json();
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ message: "image required" }, { status: 400 });
    }
    const byte = await image.arrayBuffer();
    const buffer = Buffer.from(byte);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    console.log("uploaddir", uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const originalFileName = Date.now() + "-" + image.name;
    fs.writeFileSync(path.join(uploadDir, originalFileName), buffer);

    await connectDB();
    const requestBody = {
      title,
      description,
      price,
      category,
      image: `uploads/${originalFileName}`,
    };
    //console.log("requestBody", requestBody);
    const product = await Product.create(requestBody);

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
