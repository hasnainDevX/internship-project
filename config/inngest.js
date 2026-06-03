import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../models/user.js";
import connectToDatabase from "./db.js";
import Order from "../models/Order.js";

export const inngest = new Inngest({ id: "ecommerce-app" });

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
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

export const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-update-from-clerk", triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deletion-from-clerk", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    triggers: [{ event: "order/created" }],
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  async ({ events }) => {
    const orders = events.map((event) => ({
      userId: event.data.userId,
      items: event.data.items,
      amount: event.data.amount,
      address: event.data.address,
      date: event.data.date,
    }));
    await connectToDatabase();
    await Order.insertMany(orders);
    return { success: true, processed: orders.length };
  }
);