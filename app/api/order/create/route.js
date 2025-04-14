import { NextResponse } from 'next/server';
import { getAuth } from "@clerk/nextjs/server";
import Product from '@/models/Products';
import { inngest } from '@/config/inngest';
import User from '@/models/User';
import Order from '@/models/Order';
import connectDB from '@/config/db';

export async function POST(request) {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Please select an address and add items." }, { status: 400 });
    }

    let amount = 0;
    const validItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        console.warn("Skipping invalid item", item);
        continue;
      }

      validItems.push({
        product: product._id,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    if (validItems.length === 0) {
      return NextResponse.json({ success: false, message: "No valid products found in cart." }, { status: 400 });
    }

    const finalAmount = amount + amount * 0.02;

    const newOrder = new Order({
      userId,
      address,
      items: validItems,
      amount: finalAmount,
      date: Date.now(),
    });

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items: validItems,
        amount: finalAmount,
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Order Created", orderId: newOrder._id });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
