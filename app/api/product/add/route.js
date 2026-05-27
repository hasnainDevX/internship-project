import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "../../../../lib/authSeller";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../config/db";
import Product from "../../../../models/Product";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const ifSeller = await authSeller(userId);
    if (!ifSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const category = formData.get("category");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No image file provided" }, { status: 400 });
    }

    const result = await Promise.all(files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) rej(error);
            else res(result);
          }
        );
        uploadStream.end(buffer);
      });
    }));

    const images = result.map((r) => r.secure_url);

    await connectToDatabase();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      price: Number(price),
      offerPrice: Number(offerPrice),
      category,
      image: images,
      date: Date.now(),
    });
    return NextResponse.json({ success: true, message: "Upload successful", product: newProduct }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}