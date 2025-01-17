import { db } from "@/db";
import { formatDate } from "date-fns";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) throw new Error("Slug not found");
    return getImage({ params: { slug } });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 400,
    });
  }
}

const size = {
  width: 1200,
  height: 630,
};

async function getImage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "40px",
        fontFamily: "monospace",
      }}
    >
      <img
        src={post.creatorAvatar}
        alt="Creator Avatar"
        style={{
          background: "#065F46",
          width: "80px",
          height: "80px",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      />
      <div
        style={{
          fontSize: "24px",
          color: "#6B7280",
          marginBottom: "16px",
          marginTop: "250px",
        }}
      >
        {post.date}
      </div>
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "#111827",
          margin: "0",
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h1>
    </div>,
    {
      ...size,
    },
  );
}

async function fetchPost(id: string) {
  const post = await db.query.posts.findFirst({
    where: (table, args) => args.eq(table.id, id),
    with: {
      userDetails: true,
    },
  });
  if (!post) throw new Error("Post not found");

  return {
    title: post.headline,
    creatorAvatar: post.userDetails.imageUrl,
    date: formatDate(new Date(post.createdAt), "LLLL d, yyyy"),
    creator: `${post.userDetails.firstName} ${post.userDetails.lastName}`,
  };
}
