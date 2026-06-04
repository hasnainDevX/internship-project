import connectToDatabase from "../../../../config/db";
import { getAuth } from "@clerk/nextjs/server";
import Address from "../../../../models/Address.js";
import Product from "../../../../models/Product.js";
import Order from "../../../../models/Order.js";
import {NextResponse} from "next/server";

export async function GET(request){
    try{
        const {userId} = getAuth(request);
        await connectToDatabase()

        Address.length
        Product.length

        const orders = await Order.find({userId}).populate("address items.product");

        return NextResponse.json({ success: true, orders });

    }catch(err){
        console.log(err)
        return NextResponse.json({ success: false, message: "Failed to fetch orders"});
    }
}