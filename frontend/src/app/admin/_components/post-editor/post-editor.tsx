"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/app/admin/_components/editor/tiptap-editor";
import { FC, useState } from "react";
import { Eye, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Post } from "@/types/post";
import { PostFormValues, postFormSchema } from "./schema";
import { CreatePostData, UpdatePostData } from "@/services/posts";
import { usePostsQuery } from "@/queries/posts";
import { urls } from "@/lib/urls";
import { Badge } from "@/components/ui/badge";

type PostEditorProps = {
  post?: Post | null;
};

const PostEditor: FC<PostEditorProps> = ({ post }) => {
  const router = useRouter();
  const { createPost, updatePost } = usePostsQuery();
  const [previewData, setPreviewData] = useState<PostFormValues | null>(null);
  const [newTag, setNewTag] = useState("");

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      description: post?.description || "",
      content: post?.content || "",
      coverImage: post?.coverImage || "",
      tags: post?.tags || [],
      status: post?.status || "draft",
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      const formattedData: CreatePostData = {
        ...data,
        tags: data.tags,
        status: data.status,
      };

      if (post) {
        await updatePost.mutateAsync({
          id: post._id,
          data: formattedData as UpdatePostData,
        });
      } else {
        await createPost.mutateAsync(formattedData);
      }

      router.push(urls.admin.dashboard.posts.root);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && trimmedTag.length >= 2) {
      const currentTags = form.getValues("tags") || [];
      if (currentTags.length < 5 && !currentTags.includes(trimmedTag)) {
        form.setValue("tags", [...currentTags, trimmedTag]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const isLoading = createPost.isPending || updatePost.isPending;

  const handlePreview = (values: PostFormValues) => {
    setPreviewData(values);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="my-awesome-post" {...field} />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  The URL-friendly version of the title (e.g., my-awesome-post)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A brief description of your post"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  A short summary of your post (10-200 characters)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    className="min-h-[500px]"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  The main content of your post (minimum 50 characters)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  A valid URL to the cover image for your post
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Add a tag and press Enter"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Up to 5 tags (each tag minimum 2 characters)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {post ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{post ? "Update" : "Create"} Post</>
              )}
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handlePreview(form.getValues())}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Preview Post</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[calc(80vh-8rem)]">
                  {previewData && (
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                      <h1>{previewData.title}</h1>
                      <p className="text-muted-foreground">
                        {previewData.description}
                      </p>
                      {previewData.coverImage && (
                        <Image
                          src={previewData.coverImage}
                          alt={previewData.title}
                          width={800}
                          height={400}
                          className="rounded-lg object-cover"
                        />
                      )}
                      <div
                        dangerouslySetInnerHTML={{ __html: previewData.content }}
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { PostEditor };
