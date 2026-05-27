import { getAuth } from "@clerk/nextjs/server";
import connectToDatabase from "@/config/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
    try{
        const {userId} = getAuth(request);
        console.log("userId:", userId); // add this
        
        await connectToDatabase();
        const user = await User.findById(userId);
        console.log("user:", user); // add this
        
        if(!user){
            return NextResponse.json({success: false, message: "User not found"}, {status: 404});
        }
        return NextResponse.json({success: true, user});

    }catch(error){
        console.log("error:", error); // add this
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}