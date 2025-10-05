"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import type { GetUserByIdParams } from "./shared.types";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
