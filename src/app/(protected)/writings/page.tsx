import { PostCard } from "@/components/cards/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { RadioIcon, UserRoundPenIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard />
          </Suspense>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Collections
                <Button variant="ghost" size="icon">
                  +
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="font-medium mb-2">No Collections</p>
                <p className="text-sm text-gray-500 mb-4">
                  Create a collection to organize your writing.
                </p>
                <Button>Create Collection</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-1/2">
          <Suspense fallback={<PostListSkeleton />}>
            <PostList />
          </Suspense>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Free to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Unlock the following features.</p>
              {/* <Button className="w-full mb-4">Upgrade to Pro</Button> */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Unlimited collections
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Unlimited writing ideas
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> No limits
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

async function PostList() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const posts = await db.query.posts.findMany({
    where: (table, args) =>
      args.and(args.eq(table.isDraft, false), args.eq(table.clerkId, user.id)),
    orderBy: (table, args) => args.desc(table.createdAt),
    with: {
      userDetails: true,
    },
  });
  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function UserCardSkeleton() {
  return <Skeleton className="w-full h-[234px] mb-6" />;
}

function PostListSkeleton() {
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  return Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-[216px]" />);
}

async function UserCard() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const initial = user.firstName?.at(0) ?? "N";
  const signalCount = await db.query.signals
    .findMany({
      where: (table, args) => args.eq(table.clerkId, user.id),
    })
    .then((signals) => signals.reduce((acc, signal) => acc + signal.amount, 0));

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 px-4">
        <div className="flex justify-between">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage src={user.imageUrl} alt={initial} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 border-background border-2 flex justify-center items-center bg-red-500 rounded-xl px-2 text-xs w-12 text-background gap-1">
              <RadioIcon className="size-2 text-background flex-shrink-0" />
              {signalCount}
            </div>
          </div>
          <Link href={`/${user.username ?? user.id}/edit`}>
            <Button variant="outline" className="w-full text-sm rounded-lg" size="sm">
              <UserRoundPenIcon className="size-4 mr-2 inline-flex" /> Edit Profile
            </Button>
          </Link>
        </div>
        <h2 className="text-2xl mb-2">{user.fullName}</h2>
        <p className="text-gray-600 mb-4">
          {user.publicMetadata.bio ?? "Welcome to my Typeshare Social Blog!"}
        </p>
      </CardContent>
    </Card>
  );
}
