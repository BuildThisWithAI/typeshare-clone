import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Signal, MoreHorizontal } from "lucide-react";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt="N" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">Noel Rohi Garcia</h2>
              <p className="text-gray-600 mb-4">Welcome to my Typeshare Social Blog!</p>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
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
          <Card>
            <CardHeader>
              <CardTitle>
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="N" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                Noel Rohi Garcia
                <span className="text-sm text-gray-500 ml-2">9m ago</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Headline</h3>
              <p className="text-gray-600 mb-4">ok</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Signal className="h-4 w-4 mr-1 text-red-500" />
                    20
                  </span>
                  <span>0 comments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Blog Post
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
