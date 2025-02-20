"use client";

import { PostForm } from "@/components/features/forms/post-form/post-form";
import { use } from "react";
import { FC } from "react";
type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditPostPage: FC<EditPostPageProps> = ({ params }) => {
  const { id } = use(params);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm postId={id} />
    </div>
  );
};

export default EditPostPage;
