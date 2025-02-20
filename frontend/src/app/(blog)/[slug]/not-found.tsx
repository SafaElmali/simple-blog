import Link from "next/link";
import { Button } from "@/components/ui/button";

const PostNotFound = () => {
  return (
    <div className="container max-w-4xl py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Post Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The post you are looking for does not exist or has been removed.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostNotFound;
