import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({success: false, message: "You are not a seller"})
        }

        await connectDB()

        Address.length

        const orders = await Order.find({}).populate("address items.product")

        return NextResponse.json({success: true, orders})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}
