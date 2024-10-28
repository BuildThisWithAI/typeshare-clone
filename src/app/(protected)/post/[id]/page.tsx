import { BackButton } from "@/components/buttons/back";
import { PostCard } from "@/components/cards/post";
import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const piece = await db.query.posts.findFirst({
    where: (table, args) => args.eq(table.id, params.id),
    with: {
      userDetails: true,
    },
  });
  if (!piece) notFound();
  return (
    <div className="flex flex-col max-w-3xl gap-4 mx-auto justify-center w-full py-12">
      <BackButton className="w-fit" />
      <PostCard post={piece} />
    </div>
  );
}
