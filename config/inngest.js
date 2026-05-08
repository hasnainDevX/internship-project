import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "ecommerce-app" });

// Inngest function to save data to the database
export  const syncUserCreation = inngest.createFunction({
    id: "sync-user-from-clerk",
},
{
    event: "clerk/user.created",
},
async ({ event, db }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
    }
    await connectDB();
    await User.create(userData);
}
)

// Inngest function to update user data in the database
export const syncUserUpdate = inngest.createFunction({
    id: "sync-user-update-from-clerk",
},
{
    event: "clerk/user.updated",
},
async ({ event, db }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
    }
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
})

// Inngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction({
    id: "sync-user-deletion-from-clerk",
},
{
    event: "clerk/user.deleted",
},async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
})

