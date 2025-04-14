import { NextResponse } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";
import Product from '@/models/Products';
import { inngest } from '@/config/inngest';
import User from '@/models/User';

export async function POST(request) {
    try {

        const { userId } = getAuth(request)
        const { address, items } = await request.json()

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: "Please select an address" })
        }

        // calculate amount using items
        const amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.offerprice * item.quantity;
        },0)

        await inngest.send({
            name:"order/created",
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now(),
            }
        })

        //clear cart

        const user = await User.findById(userId)
        user.cartItems = {}
            await user.save()

        return NextResponse.json({ success: true, message: "Order Created" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}