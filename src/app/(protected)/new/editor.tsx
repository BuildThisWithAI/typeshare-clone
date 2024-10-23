"use client";

import { Input } from "@/components/ui/input";
import { Editor } from "novel";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";
import { PublishButton } from "./_interactive";
import { savePost } from "./actions";

interface EditorProps extends React.ComponentProps<typeof Editor> {
  headline: string;
}

export default function EDITOR({ onDebouncedUpdate, headline, ...props }: EditorProps) {
  const [_, startTransition] = useTransition();
  const [postId, setPostId] = useQueryState("postId");
  return (
    <div className="bg-background p-4 rounded-lg w-full mx-10">
      <div className="flex justify-between gap-4">
        <Input
          className="w-fit focus:bg-gray-200 border-0 focus-visible:ring-0 focus:border-0"
          placeholder="Untitled ..."
        />
        {postId && <PublishButton />}
      </div>
      <Editor
        {...props}
        storageKey={`editor-${postId}`}
        onDebouncedUpdate={(editor) => {
          startTransition(async () => {
            if (editor) {
              const res = await savePost({
                id: postId ?? undefined,
                content: JSON.stringify(editor.getJSON()),
                headline,
              });
              if (res.success) {
                const { post } = res;
                if (post?.[0]?.id) {
                  setPostId(post[0].id);
                }
                // toast.success("Post saved successfully.");
              }
              if (res.error) {
                toast.error(res.error);
              }
            }
          });
        }}
      />
    </div>
  );
}
