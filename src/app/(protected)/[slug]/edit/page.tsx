import { EditProfile } from "@/components/profile-edit";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const profile = await db.query.userDetails.findFirst({
    where: (table, args) =>
      args.or(args.eq(table.clerkId, params.slug), args.eq(table.username, params.slug)),
  });

  return (
    <div className="flex flex-col justify-center h-full pt-10">
      {/* <div className="mx-auto max-w-2xl flex justify-start">
        <Link href="/" className="w-full">
          <Button>Back</Button>
        </Link>
      </div> */}
      <EditProfile initialProfile={profile} />
    </div>
  );
}
