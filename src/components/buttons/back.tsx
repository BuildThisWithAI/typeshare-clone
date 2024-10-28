"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton(props: React.ComponentProps<typeof Button>) {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()} {...props}>
      <ArrowLeft className="size-4 mr-2" />
      Back
    </Button>
  );
}
