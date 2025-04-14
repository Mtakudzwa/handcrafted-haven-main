import { Inngest } from "inngest";
import connectDB from "./db";
import  User  from "@/models/User"; 
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "handcrafted-haven" });

// Inngest function to save user data to MongoDB
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation-from-clerk", // updated ID
  },
  { event: "clerk/user.created" }, 
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

// Inngest function to update user data to MongoDB
export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk", // updated ID
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id,userData)
  }
);

// Inngest function to delete user data from MongoDB
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk", // this one was already unique
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);


// Inngest function to create user order in MongoDB
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 4,
      timeout: "5s"
    }
  },
  { event: "order/created" },
  async ({ events }) => {

    await connectDB();

    // Map to orders
    const orders = events.map((event) => ({
      userId: event.data.userId,
      items: event.data.items,
      amount: event.data.amount,
      address: event.data.address,
      status: event.data.status,
      date: event.data.date
    }));

    // Validate orders: only keep ones with required fields
    const validOrders = orders.filter(order => 
      order.userId && order.amount !== undefined && order.amount !== null
    );

    // Log invalid ones for debugging
    const invalidOrders = orders.filter(order => 
      order.amount === undefined || order.amount === null
    );
    if (invalidOrders.length > 0) {
      console.warn(`Skipped ${invalidOrders.length} orders missing 'amount':`, invalidOrders);
    }

    // If no valid orders, exit gracefully
    if (validOrders.length === 0) {
      return { success: false, processed: 0, reason: "No valid orders found." };
    }

    // Insert valid orders
    await Order.insertMany(validOrders);

    return { success: true, processed: validOrders.length };
  }
);
