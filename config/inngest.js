import { Inngest } from "inngest";  
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "handcrafted-haven" });

//Inngest function to save user data to a database
export const syncUserCreate = inngest.createFunction(
  {
    id: "sync-user-from-clerk"
  },
  { event: "clerk/user.created" },
  async({event}) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      // biome-ignore lint/style/useTemplate: <explanation>
      name: first_name + " " + last_name,
      imageUrl: image_url
    }
    await connectDB()
    await User.create(userData)
  }
)

//Inngest function to update user data in a database
export const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-user-update-from-clerk"
  },
  { event: "clerk/user.updated" },
  async({event}) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      // biome-ignore lint/style/useTemplate: <explanation>
      name: first_name + " " + last_name,
      imageUrl: image_url
    }
    await connectDB()
    await User.findByIdAndUpdate(id,userData)
  }
)

//Inngest function to delete user from a database
export const syncUserDelete = inngest.createFunction(
  {
    id: "sync-user-deletion-from-clerk"
  },
  { event: "clerk/user.deleted" },
  async({event}) => {
    const { id } = event.data

    await connectDB()
    await User.findByIdAndDelete(id)
  }
)