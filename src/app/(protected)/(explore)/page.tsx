import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { relativeTime } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Globe, Pencil, RadioIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const initial = user.firstName?.at(0) ?? "N";
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <UserCard />
          <div className="bg-background p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 flex justify-between items-center">
              Recent Drafts
              <Link href="#" className="text-sm text-blue-600">
                View all
              </Link>
            </h3>
            <Suspense>
              <RecentDrafts />
            </Suspense>
          </div>
        </div>

        {/* Main Feed */}
        <div className="w-full lg:w-1/2">
          <div className="bg-background p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user.imageUrl} alt={initial} />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <Link href="/new" className="w-full">
                <Button variant="outline" className="w-full text-left justify-start">
                  What will you write today?
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Not following anyone</h3>
            <p className="text-gray-600 mb-4">Follow authors to see their Pieces here.</p>
            <Link href="/writings">
              <Button
                className="bg-background text-foreground hover:bg-background/90 rounded-lg border"
                size="sm"
              >
                Explore Writing
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-background p-6 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-4">Leaderboard</h3>
            <Suspense>
              <LeaderboardContent />
            </Suspense>
          </div>

          <div className="bg-background p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">How to Earn Signal</h3>
            <p className="text-sm text-gray-600 mb-4">
              Earn Signal to climb the leaderboard and increase your visibility.
              <Link href="#" className="text-blue-600 ml-1">
                See what earns Signal
              </Link>
              .
            </p>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Pencil className="h-4 w-4 mr-2 text-gray-400" />
                Write: Publish Pieces regularly
              </li>
              <li className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                Receive: Receive Signal from others
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
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
      <CardContent className="pt-6 p-4 space-y-4">
        <Avatar className="size-10">
          <AvatarImage src={user.imageUrl} alt={initial} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
        <p className="text-muted-foreground mb-4">
          {user.publicMetadata.bio ?? "Welcome to my Typeshare Social Blog!"}
        </p>
        <Separator />
        <div className="flex justify-between text-sm mt-4">
          <div className="font-semibold">Signal</div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <RadioIcon className="size-4" /> {signalCount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function LeaderboardContent() {
  const leaderboard = await db.query.signals.findMany({
    orderBy: (table, args) => args.desc(table.amount),
    with: {
      userDetails: true,
    },
  });
  const values = leaderboard.map((signal) => ({
    name: `${signal.userDetails.firstName} ${signal.userDetails.lastName}`,
    signal: signal.amount,
    imageUrl: signal.userDetails.imageUrl,
  }));
  return (
    <ul className="space-y-4">
      {values.map((user, index) => (
        <li key={user.name} className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium mr-2">{index + 1}</span>
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{user.name}</span>
          </div>
          <span className="text-red-500 text-xs flex gap-1 font-semibold">
            <RadioIcon className="size-4 rotate-45" />
            {user.signal}
          </span>
        </li>
      ))}
    </ul>
  );
}

async function RecentDrafts() {
  const posts = await db.query.posts.findMany({
    where: (table, args) => args.eq(table.isDraft, true),
    orderBy: (table, args) => args.desc(table.createdAt),
    with: {
      userDetails: true,
    },
  });
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Link href={`/new?postId=${post.id}`} className="text-sm text-gray-600" key={post.id}>
          <p>{post.headline !== "" ? post.headline : "Untitled..."}</p>
          <p className="text-xs text-gray-400">{relativeTime(post.createdAt)} • Post</p>
        </Link>
      ))}
    </div>
  );
}
