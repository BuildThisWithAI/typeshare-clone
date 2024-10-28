"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { savePost } from "./actions";

export function PostCreator(props: { content: string }) {
  const user = useUser();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(props.content);
  const [title, setTitle] = useState<undefined | string>();
  const router = useRouter();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">{title ?? "Untitled..."}</div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                startTransition(async () => {
                  if (!title) {
                    toast.error("Please write a headline first.");
                    return;
                  }
                  const res = await savePost({ content, headline: title ?? "Untitled..." });
                  if (res.success) {
                    toast.success("Post published successfully.");
                    if (res.post?.at(0)?.id) {
                      router.replace(`/post/${res.post?.at(0)?.id}`);
                    }
                  }
                });
              }}
              disabled={isPending}
              {...props}
            >
              Publish{isPending ? "ing" : ""}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">
            {formatDate(new Date(), "LLLL d, yyyy")}
          </div>
          <Input
            type="text"
            placeholder="Write a headline...."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold border-none p-0 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
            N
          </div>
          <div>
            <div className="font-semibold">By {user.user?.fullName}</div>
            <div className="text-sm text-muted-foreground">
              {user.user?.publicMetadata.bio ?? "Welcome to my Typeshare Social Blog!"}
            </div>
          </div>
        </div>

        <Editor content={content} onChange={(content) => setContent(JSON.stringify(content))} />
      </CardContent>
    </Card>
  );
}
