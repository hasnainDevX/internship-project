import connectToDatabase from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
       
        await connectToDatabase();
        const products = await Product.find({});
        return NextResponse.json({ success: true, message: "Authorized", products }, { status: 200 });
    } catch(err){
        return NextResponse.json({ success: false, message: "An error occurred while checking authorization" }, { status: 500 });
    }
}