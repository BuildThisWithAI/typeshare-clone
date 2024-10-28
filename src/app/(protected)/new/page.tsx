import { db } from "@/db";
import { PostCreator } from "./post-creator";
import { searchParamsCache } from "./searchParams";

type PageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function EditorPage({ searchParams }: PageProps) {
  const { postId } = searchParamsCache.parse(searchParams);
  let postContent = "";
  if (postId) {
    const post = await db.query.posts.findFirst({
      where: (table, args) => args.eq(table.id, postId),
    });
    postContent = post?.content ? JSON.parse(post.content) : "";
  }
  return (
    <div className="flex justify-center w-full min-h-screen px-12 py-2">
      <PostCreator content={postContent} />
    </div>
  );
}
