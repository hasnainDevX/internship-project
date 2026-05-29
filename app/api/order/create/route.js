import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST(request){
    try{
        const {userId} = getAuth(request);
        const {address, items} = await request.json();

        if(!address || items.length === 0){
            return NextResponse.json({ success: false, messege: "Invalid data"});
        }

        //calculate amount
        // const amount 


    }catch(err){

    }
}