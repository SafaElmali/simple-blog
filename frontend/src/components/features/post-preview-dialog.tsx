"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { HtmlViewer } from "./html-viewer";

type PostPreviewDialogProps = {
  title: string;
  description?: string;
  coverImage?: string;
  content: string;
  trigger?: ReactNode;
};

const PostPreviewDialog: FC<PostPreviewDialogProps> = ({
  title,
  description,
  coverImage,
  content,
  trigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button type="button" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(80vh-8rem)]">
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <h1>{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
            {coverImage && (
              <Image
                src={coverImage}
                alt={title}
                width={800}
                height={400}
                className="rounded-lg object-cover"
              />
            )}
            <HtmlViewer content={content} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { PostPreviewDialog };
