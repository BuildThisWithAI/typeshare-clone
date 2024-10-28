"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function savePost({
  id,
  content,
  headline,
}: { id?: string; content: string; headline: string }) {
  try {
    const sess = auth();
    if (!sess.userId) throw new Error("Unauthorized.");
    if (!id) {
      const post = await db
        .insert(posts)
        .values({
          clerkId: sess.userId,
          content,
          headline,
          isDraft: false,
        })
        .returning();
      return {
        success: true,
        post,
      };
    }
    const post = await db
      .update(posts)
      .set({
        content,
        headline,
      })
      .where(eq(posts.id, id))
      .returning();

    return {
      success: true,
      post: post,
    };
  } catch (error) {
    console.error(error);
    let msg = "Something went wrong.";
    if (error instanceof Error) {
      msg = error.message;
    }
    return { error: msg, success: false };
  }
}
