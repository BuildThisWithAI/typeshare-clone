"use client";

import { SparklesIcon } from "lucide-react";
import { BubbleMenuButton } from "../bubble-menu/bubble-menu-button";

type Props = {
  onSelect: () => void;
};

export function AskAI({ onSelect }: Props) {
  return (
    <BubbleMenuButton action={onSelect} isActive={false} className="flex space-x-2 items-center">
      <SparklesIcon className="size-4" />
    </BubbleMenuButton>
  );
}
