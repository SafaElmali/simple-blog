const PostSkeleton = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="h-12 w-3/4 mb-4 bg-secondary animate-pulse rounded" />
        <div className="h-6 w-full mb-6 bg-secondary animate-pulse rounded" />
        <div className="aspect-video w-full mb-8 bg-secondary animate-pulse rounded-lg" />
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
        </div>
      </header>
      <div className="space-y-4">
        <div className="h-4 w-full bg-secondary animate-pulse rounded" />
        <div className="h-4 w-full bg-secondary animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-secondary animate-pulse rounded" />
        <div className="h-4 w-full bg-secondary animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-secondary animate-pulse rounded" />
      </div>
      <footer className="mt-8 pt-8 border-t">
        <div className="h-4 w-48 bg-secondary animate-pulse rounded" />
      </footer>
    </article>
  );
};

export { PostSkeleton };
