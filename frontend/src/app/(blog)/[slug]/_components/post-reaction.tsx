import { FC, useCallback } from "react";
import { Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIncrementLikeMutation, useGetLikeStatusQuery } from "@/queries/reactions";
import { useToast } from "@/components/ui/use-toast";

interface PostReactionProps {
  postId: string;
  title: string;
}

export const PostReaction: FC<PostReactionProps> = ({ postId, title }) => {
  const { data: likeStatus, isLoading: isStatusLoading } = useGetLikeStatusQuery(postId);
  const { mutate: incrementLike, isPending } = useIncrementLikeMutation();
  const { toast } = useToast();

  const handleLikeClick = () => {
    if (isPending) return;
    incrementLike(postId);
  };

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast({
          title: "Failed to share",
          description: "Please try copying the URL manually.",
          variant: "destructive",
        });
      }
    }
  }, [title, toast]);

  const isLiked = likeStatus?.userLikes === 1;

  return (
    <AnimatePresence>
      {!isStatusLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="sticky bottom-8 flex items-center justify-center gap-4 py-4"
        >
          <div className="flex items-center gap-4 rounded-full bg-background/95 px-6 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLikeClick}
                className={cn(
                  "rounded-full p-2 transition-all",
                  "hover:scale-110 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isLiked && "text-red-500"
                )}
                disabled={isPending}
                aria-label={isLiked ? "Unlike post" : "Like post"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLiked ? "liked" : "unliked"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Heart
                      size={28}
                      className={cn(
                        "transition-colors duration-200",
                        isLiked ? "fill-current" : "fill-none"
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </button>

              <AnimatePresence mode="wait">
                <motion.span
                  key={likeStatus?.totalLikes}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="min-w-[2ch] text-base font-medium"
                >
                  {likeStatus?.totalLikes}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-border" />

            <button
              onClick={handleShare}
              className={cn(
                "rounded-full p-2 transition-all text-muted-foreground",
                "hover:scale-110 hover:text-foreground active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
              aria-label="Share article"
            >
              <Share2 size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 