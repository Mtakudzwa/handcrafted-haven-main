import { v2 as cloudinary } from 'cloudinary';
import { getAuth } from '@clerk/nextjs/server';
import authSeller from '@/lib/authSeller';
import { NextResponse } from 'next/server';

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function POST(request) {
    try {

        const { userId } = getAuth()

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "You are not authorized to perform this action" })
        }

        const formData = await request.formData()

        const name = formData.get("name");
        const description = formData.get("description");
        const category = formData.get("category");
        const price = formData.get("price");
        const offPrice = formData.get("offPrice");


        const files = formData.getAll("Images");

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: "Please upload at least one image" })
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },

                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result.secure_url)
                            }
                        }

                    )
                    stream.end(buffer)
                })
            })
        )
        
        const images = result.map(result => result.secure_url)

        await connectDB()
        const newProduct = new Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offPrice),
            images,
            Date: Date.now()
        })

        return NextResponse.json({ success: true, message: "Product added successfully", product: newProduct })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}