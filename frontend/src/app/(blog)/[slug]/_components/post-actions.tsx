import { FC } from "react";
import { Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  useReactionMutation,
  useGetReactionStatusQuery,
} from "@/queries/reactions";
import { useToast } from "@/components/ui/use-toast";

type PostActionsProps = {
  postId: string;
  title: string;
};

export const PostActions: FC<PostActionsProps> = ({ postId, title }) => {
  const {
    data: likeStatus,
    isLoading: isStatusLoading,
    refetch,
  } = useGetReactionStatusQuery(postId);
  const { mutate: incrementLike, isPending } = useReactionMutation();
  const { toast } = useToast();

  const handleLikeClick = () => {
    if (isPending) return;
    incrementLike(postId);
    refetch();
  };

  const handleShare = async () => {
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
      if (error instanceof Error) {
        toast({
          title: "Failed to share",
          description: "Please try copying the URL manually.",
          variant: "destructive",
        });
      }
    }
  };

  const hasLikes = likeStatus?.userLikes && likeStatus.userLikes > 0;

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
                  hasLikes && "text-red-500"
                )}
                disabled={isPending}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hasLikes ? "liked" : "unliked"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Heart
                      size={28}
                      className={cn(
                        "transition-colors duration-200",
                        hasLikes ? "fill-current" : "fill-none"
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </button>

              <div className="flex flex-col items-center">
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
