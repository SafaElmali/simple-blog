import { PostForm } from "@/components/features/forms/post-form/post-form";

const NewPostPage = () => {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-muted-foreground mt-2">
          Create a new blog post by filling out the form below.
        </p>
      </div>
      <PostForm />
    </div>
  );
};

export default NewPostPage;
