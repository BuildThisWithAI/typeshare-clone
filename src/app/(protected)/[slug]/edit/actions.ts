"use server";
import { db } from "@/db";
import { type InsertUserDetails, userDetails } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(values: InsertUserDetails) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized.");
    await clerkClient().users.updateUser(user.id, {
      publicMetadata: {
        bio: values.bio ?? "Welcome to my Typeshare Social Blog!",
      },
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    const insertedUser = await db
      .insert(userDetails)
      .values(values)
      .onConflictDoUpdate({
        set: values,
        target: userDetails.username,
      })
      .returning();
    return {
      success: true,
      user: insertedUser,
    };
  } catch (error) {
    console.error(error);
    let msg = "Something went wrong.";
    if (error instanceof Error) {
      msg = error.message;
    }
    return { error: msg, success: false };
  } finally {
    revalidatePath("/writings");
    revalidatePath("/");
  }
}
