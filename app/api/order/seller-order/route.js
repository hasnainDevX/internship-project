import { getAuth } from "@clerk/nextjs/server";
import authSeller from "../../../../lib/authSeller.js";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../config/db.js";
import Address from "../../../../models/Address.js";
import Product from "../../../../models/Product.js";
import Order from "../../../../models/Order.js";

export async function GET(request){
    try{
        const {userId} = getAuth(request);
        const isSeller = await authSeller(userId);

        if(!isSeller){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        Address.length
        Product.length

        const orders = await Order.find({}).populate("address items.product");

        return NextResponse.json({ success: true, orders });

    }catch(err){
        console.log(err)
        return NextResponse.json({ success: false, message: "Failed to fetch seller orders" });
    }
}