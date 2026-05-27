import { getAuth } from  "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import Product from "@/models/Product";

export async function GET(request){
    try{
        const { userId } = getAuth(request);
        const ifSeller = await authSeller(userId);
        if(!ifSeller){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        await connectToDatabase();
        const products = await Product.find({});
        return NextResponse.json({ success: true, message: "Authorized", products }, { status: 200 });
    } catch(err){
        return NextResponse.json({ success: false, message: "An error occurred while checking authorization" }, { status: 500 });
    }
}