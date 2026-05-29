import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import Address from "@/models/Address"; // Capital A

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { address } = await request.json();

    if (!address || !address.fullName || !address.phoneNumber || !address.pincode || !address.area || !address.city || !address.state) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();
    const newAddress = await Address.create({ ...address, userId });

    return NextResponse.json({ success: true, message: "Address added successfully", address: newAddress }, { status: 201 });
  } catch (error) {
    console.error("Error adding address:", error.message);
    return NextResponse.json({ success: false, message: error.message || "Failed to add address" }, { status: 500 });
  }
}