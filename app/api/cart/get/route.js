import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectToDatabase from "@/config/db";
import Address from "@/models/Address";  // ✅ Change this

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const addresses = await Address.find({ userId });

    return NextResponse.json({ success: true, addresses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}