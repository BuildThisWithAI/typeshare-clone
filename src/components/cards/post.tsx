"use client";

import { extensions } from "@/components/editor/extentions/register";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SelectPost, SelectUserDetails } from "@/db/schema";
import { UTCDate } from "@date-fns/utc";
import { EditorContent, useEditor } from "@tiptap/react";
import { formatDistance } from "date-fns";
import { MessageCircle, MoreHorizontal, RadioIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function PostCard({
  post,
}: {
  post: SelectPost & {
    userDetails: SelectUserDetails;
  };
}) {
  const initial = post.userDetails.firstName?.at(0) ?? "N";
  const editor = useEditor({
    extensions,
    content: post.content ? JSON.parse(post.content) : undefined,
    editable: false,
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);
  return (
    <Link href={`/post/${post.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex gap-2">
              <Avatar className="size-14">
                <AvatarImage src={post.userDetails.imageUrl} alt={initial} />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <div className="font-normal">
                <div className="text-base font-semibold">
                  {post.userDetails.firstName} {post.userDetails.lastName}
                </div>
                <div className="text-sm text-muted-foreground">{post.userDetails.bio}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDistance(new Date(post.createdAt), new UTCDate(), { addSuffix: true })}
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" className="size-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">{post.headline}</h3>
          <EditorContent editor={editor} />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center text-xs gap-2">
              <Button className="flex items-center h-6 text-xs px-1" size="sm" variant="outline">
                <RadioIcon className="size-3 mr-1 rotate-45" />
                20
              </Button>
              <Button className="flex items-center h-6 text-xs px-1" size="sm" variant="outline">
                <MessageCircle className="size-3 mr-1" />0
              </Button>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Blog Post
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
