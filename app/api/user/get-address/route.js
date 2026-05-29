import connectToDatabase from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import Address from "@/models/Address"; 
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    console.log("GET userId:", userId);

    await connectToDatabase();
    const addresses = await Address.find({ userId });
    console.log("Found addresses:", addresses); // Check what's returned
    
    if (!addresses || addresses.length === 0) {
      return NextResponse.json({ addresses: [] }, { status: 200 });
    }

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}