
# 🧵 Handcrafted Haven

**Live Demo**: [https://handcrafted-haven-main.vercel.app](https://handcrafted-haven-main.vercel.app)  
**GitHub Repository**: [https://github.com/Mtakudzwa/handcrafted-haven-main](https://github.com/Mtakudzwa/handcrafted-haven-main)  
**Project Board**: [https://github.com/Mtakudzwa/handcrafted-haven-main/projects/1](https://github.com/Mtakudzwa/handcrafted-haven-main/projects/1)  
**Demo Video**: [https://youtu.be/meIA9g_rxWI](https://youtu.be/meIA9g_rxWI)

---

## 📦 Overview

**Handcrafted Haven** is an innovative artisan marketplace web application that allows independent creators to sell their handcrafted goods and build a personal brand online.

Although this project was designed as a group assignment, I completed it independently. I structured the work using GitHub Projects to simulate a collaborative team workflow, managing all tasks, commits, and deployments on my own.

---

## 🚀 Tech Stack

### Frontend
- React.js with Next.js 13
- Tailwind CSS
- ShadCN/UI components
- Lucide Icons

### Backend
- Node.js with Express
- MongoDB via Mongoose
- RESTful API
- JWT authentication

### Tools & DevOps
- Vercel (Frontend deployment)
- Render (optional backend)
- Postman (API testing)
- GitHub Projects (task management)
- Cloudinary (image uploads)

---

## 🛍️ Features

- 🔐 Secure authentication for buyers & sellers
- 🧑‍🎨 Seller profile pages with bio, image, and product listings
- 🛍️ Product listing, editing, and removal
- 🛒 Shopping cart with quantity controls
- 💳 Stripe-integrated checkout flow
- 🌟 Product reviews with ratings
- 🧭 Filters by category, price, artisan
- 🖼️ Cloudinary integration for media uploads
- 📦 Order management (seller & buyer views)

---

## 🌐 REST API Highlights

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/api/products`        | Fetch all products                  |
| POST   | `/api/products`        | Create new product (auth required)  |
| GET    | `/api/sellers/:id`     | Fetch specific seller profile       |
| POST   | `/api/auth/register`   | Register user                       |
| POST   | `/api/reviews`         | Submit a review                     |

Protected routes are guarded with JWT middleware.

---

## 🧬 Database Models

### `User`
```js
{
  name: String,
  email: String,
  password: String,
  role: "buyer" | "seller",
  avatar: String
}
```

### `SellerProfile`
```js
{
  userId: ObjectId,
  bio: String,
  location: String,
  craftType: String,
  socialLinks: [String]
}
```

### `Product`
```js
{
  title: String,
  description: String,
  category: String,
  price: Number,
  images: [String],
  artisanId: ObjectId
}
```

### `Review`
```js
{
  productId: ObjectId,
  userId: ObjectId,
  rating: Number,
  text: String
}
```

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Mtakudzwa/handcrafted-haven-main

# Install frontend dependencies
cd client
pnpm install

# Start development server
pnpm run dev
```

---

## 🔐 Environment Variables

```env
# Public
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=*****************************

# Private
CLERK_SECRET_KEY=**************************************************************
MONGODB_URI=*******************************************
INNGEST_SIGNING_KEY='****************************************************************'
INNGEST_EVENT_KEY='************************************************************************'

# Cloudinary
CLOUDINARY_CLOUD_NAME='*********************'
CLOUDINARY_API_KEY='*******************************'
CLOUDINARY_API_SECRET='***********************************************************'
```

---

## 📹 Demo Video

Watch the full 7-minute demo and walkthrough here:  
🎥 [https://youtu.be/meIA9g_rxWI](https://youtu.be/meIA9g_rxWI)

---

## 👤 Solo Group Reflection

This project was an excellent challenge in solo full-stack development.  
To simulate a group dynamic, I utilized GitHub Projects and scoped the work into iterative modules, handling design, development, and deployment independently.  
The process strengthened my understanding of system design, RESTful APIs, secure authentication, and user-centered UI/UX.

---
