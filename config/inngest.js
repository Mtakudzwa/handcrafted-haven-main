import { Inngest } from "inngest";
import connectDB from "./db";
import  User  from "@/models/User"; // Adjust the import path as necessary

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

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
