import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import User from "@/models/User";

export async function POST(request){
    try{
        const { userId } = getAuth(request);
        const {cartData} = await request.json();
        await connectToDatabase();
        const user = await User.findById(userId);
        user.cartItems = cartData;
        user.save()
        NextResponse.json({ success: true, message: "Cart updated successfully" }, { status: 200 });

    }catch(err){
        return NextResponse.json({ success: false, message: "An error occurred while updating cart" }, { status: 500 });
    }
}