import { db } from "@/db";
import { ImageResponse } from "next/og";

// Route segment config
// Image metadata
export const alt = "Blog Post Open Graph Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  // Fetch post data (replace with your actual data fetching logic)
  const post = await fetchPost(params.id);

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #4F46E5, #7C3AED)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "white",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h1>
      <p
        style={{
          fontSize: "32px",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        By {post.creator}
      </p>
    </div>,
    {
      ...size,
    },
  );
}

// Mock function to fetch post data (replace with actual data fetching logic)
async function fetchPost(id: string) {
  const post = await db.query.posts.findFirst({
    where: (table, args) => args.eq(table.id, id),
    with: {
      userDetails: true,
    },
  });
  if (!post) throw new Error("Post not found");

  // In a real application, you would fetch this data from your API or database
  return {
    title: post.headline,
    creator: `${post.userDetails.firstName} ${post.userDetails.lastName}`,
  };
}
