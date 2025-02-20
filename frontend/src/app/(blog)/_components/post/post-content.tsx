"use client";

import { FC } from "react";
import { notFound } from "next/navigation";
import { PostSkeleton } from "./post-skeleton";
import { useGetPostBySlug } from "@/queries/posts";
import Image from "next/image";

type PostContentProps = {
  slug?: string;
};

const PostContent: FC<PostContentProps> = ({ slug }) => {
  const { data: post, isLoading, error } = useGetPostBySlug(slug);

  if (isLoading) return <PostSkeleton />;

  if (error || !post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <footer className="mt-8 pt-8 border-t">
        <time className="text-sm text-muted-foreground">
          Published on {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </footer>
    </article>
  );
};

export { PostContent };
