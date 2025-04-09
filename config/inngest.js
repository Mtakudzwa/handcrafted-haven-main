import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Ingest function to save user data to MongoDB
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk"
      },
      {
        event: "clert/user.created"},
        async ({ event }) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data
            const userData = {
                _id: id,
                name: `${first_name} ${last_name}`,
                email: email_addresses[0].email_address,
                imageUrl: image_url
            }
            await connectDB()
            await User.create(userData)
      }
)

// Ingest function to update user data to MongoDB
export const syncUserUpdate = inngest.createFunction(
    {
        id: "sync-user-from-clerk"
      },
      {
        event: "clerk/user.updated"},
        async ({ event }) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data
            const userData = {
                name: `${first_name} ${last_name}`,
                email: email_addresses[0].email_address,
                imageUrl: image_url
            }
            await connectDB()
            await User.findByIdAndUpdate({ _id: id }, { $set: userData })
      }
)

// Ingest function to delete user data from MongoDB
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-with-clerk"
      },
      {
        event: "clerk/user.deleted"},
        async ({ event }) => {
            const { id } = event.data
            await connectDB()
            await User.findByIdAndDelete({ _id: id })
      }
)