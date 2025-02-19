"use client";

import { PostEditor } from "@/app/admin/_components/post-editor/post-editor";

export default function NewPostPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-muted-foreground mt-2">
          Create a new blog post by filling out the form below.
        </p>
      </div>
      <div className="max-w-3xl">
        <PostEditor />
      </div>
    </div>
  );
}
