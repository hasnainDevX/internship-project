import { getAuth } from "@clerk/nextjs/server";
import { Inngest } from "inngest";
import { NextResponse } from "next/server";
import Product from "../../../models/product.js";
import User from "../../../models/user.js";
import { createUserOrder } from "../../../config/inngest.js";


export async function POST(request){
    try{
        const {userId} = getAuth(request);
        const {address, items} = await request.json();

        if(!address || items.length === 0){
            return NextResponse.json({ success: false, messege: "Invalid data"});
        }

        //calculate amount
        const amount = await items.reduce(async (accessedDynamicAmount, item) => {
            const product = await Product.findById(item.product);
            return accessedDynamicAmount + product.offerPrice * item.quantity;
        }, 0);

        await Inngest.send({
            name: 'order/created',
            data: {
                userId,
                items,
                amount: amount + Math.floor(amount * 0.13), // adding 13% tax
                address,
                date: date.now(),
            }
        });

        // clear user cart
        const user = await UserfindById(userId);
        user.cartItems = [];
        await user.save();

        return NextResponse.json({ success: true, messege: "Order created successfully"});

    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false, messege: "Failed to create order"});
    }
}