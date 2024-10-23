"use client";

import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";
import { publishPost } from "./actions";

export function PublishButton({
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();
  const [postId] = useQueryState("postId");
  return (
    <Button
      className={className}
      onClick={() => {
        startTransition(async () => {
          if (postId) {
            const res = await publishPost({ id: postId });
            if (res.success) {
              toast.success("Post published successfully.");
            }
          }
        });
      }}
      disabled={disabled || isPending}
      {...props}
    >
      Publish{isPending ? "ing" : ""}
    </Button>
  );
}
