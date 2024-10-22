import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Globe, Pencil } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const userInitial = user.fullName?.at(0) ?? "N";
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-background p-6 rounded-lg shadow mb-6">
            <Avatar className="h-16 w-16 mb-4">
              <AvatarImage src={user.imageUrl} alt={userInitial} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-2">{user.fullName}</h2>
            <p className="text-gray-600 mb-4">Welcome to my Typeshare Social Blog!</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Signal: 0</span>
              <span>Streak: 0</span>
            </div>
          </div>
          <div className="bg-background p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 flex justify-between items-center">
              Recent Drafts
              <Link href="#" className="text-sm text-blue-600">
                View all
              </Link>
            </h3>
            <div className="text-sm text-gray-600">
              <p>Untitled...</p>
              <p className="text-xs text-gray-400">3m ago • LinkedIn Post</p>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="w-full lg:w-1/2">
          <div className="bg-background p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder-avatar.jpg" alt="N" />
                <AvatarFallback>N</AvatarFallback>
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
            <Button
              className="bg-background text-foreground hover:bg-background/90 rounded-lg border"
              size="sm"
            >
              Explore Writing
            </Button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-background p-6 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-4">Leaderboard</h3>
            <ul className="space-y-4">
              {[
                { name: "John Vial", signal: 3938 },
                { name: "Shaun Coffey", signal: 3363 },
                { name: "Dickie Bush", signal: 2957 },
                { name: "Cody Dakota Wooten", signal: 2786 },
                { name: "Nilo Gomez", signal: 1966 },
              ].map((user, index) => (
                <li key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{index + 1}</span>
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                  <span className="text-red-500">{user.signal}</span>
                </li>
              ))}
            </ul>
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
