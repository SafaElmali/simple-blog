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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FC, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PostFormValues, postFormSchema } from "./schema";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from "@/queries/posts";
import { UrlUtil } from "@/lib/urls";
import { PostSkeleton } from "@/components/features/forms/post-form/_components/post-skeleton";
import { buildSlug } from "@/lib/slugify";
import { PostPreviewDialog } from "@/components/features/post-preview-dialog/post-preview-dialog";
import { TagInput } from "@/components/features/forms/_components/tag-input/tag-input";
import { TiptapEditor } from "@/components/features/tiptap-editor/tiptap-editor";

type PostFormProps = {
  postId?: string;
};

const PostForm: FC<PostFormProps> = ({ postId }) => {
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [previewData, setPreviewData] = useState<PostFormValues | null>(null);
  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery(postId);
  const { mutateAsync: createPost, isPending: isCreating } =
    useCreatePostMutation();
  const { mutateAsync: updatePost, isPending: isUpdating } =
    useUpdatePostMutation();
  const isLoading = isCreating || isUpdating || isPostLoading;
  const buttonText = postId ? "Update" : "Create";
  const buttonLoadingText = postId ? "Updating..." : "Creating...";
  const router = useRouter();

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

  useEffect(() => {
    if (post) {
      form.reset(post);
    }
  }, [post, form]);

  const title = form.watch("title");

  // Update slug when title changes
  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      const generatedSlug = buildSlug(title);
      form.setValue("slug", generatedSlug);
    }
  }, [title, form, isSlugManuallyEdited]);

  const onSubmit = async (data: PostFormValues) => {
    try {
      if (post) {
        await updatePost({
          id: post._id,
          data,
        });
      } else {
        await createPost(data);
      }

      router.push(UrlUtil.buildAdminPostsPath());
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handlePreview = (values: PostFormValues) => {
    setPreviewData(values);
  };

  if (isLoading) return <PostSkeleton />;

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
                  <Input
                    {...field}
                    placeholder="my-awesome-post"
                    onChange={(e) => {
                      field.onChange(e);
                      setIsSlugManuallyEdited(true);
                    }}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  The URL-friendly version of the title (e.g., my-awesome-post).
                  This is automatically generated but can be edited.
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
                    {...field}
                    placeholder="A brief description of your post"
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
                  <TiptapEditor content={field.value} {...field} hideOutput />
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
                    {...field}
                    placeholder="https://example.com/image.jpg"
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
                  <TagInput
                    tags={field.value || []}
                    onChange={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Up to 5 tags (each tag minimum 2 characters)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Published</FormLabel>
                  <FormDescription>
                    Switch to publish or unpublish your post
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === "published"}
                    onCheckedChange={(checked: boolean) =>
                      field.onChange(checked ? "published" : "draft")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {buttonLoadingText}
                </>
              ) : (
                <>{buttonText} Post</>
              )}
            </Button>

            {previewData && (
              <PostPreviewDialog
                title={previewData.title}
                description={previewData.description}
                coverImage={previewData.coverImage}
                content={previewData.content}
                trigger={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handlePreview(form.getValues())}
                  >
                    Preview
                  </Button>
                }
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export { PostForm };
