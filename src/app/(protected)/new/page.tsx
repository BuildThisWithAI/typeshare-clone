import { Editor } from "novel";

export default function EditorPage() {
  return (
    <div className="flex justify-center w-full min-h-screen py-12">
      <Editor completionApi="/api/generate" />
    </div>
  );
}
