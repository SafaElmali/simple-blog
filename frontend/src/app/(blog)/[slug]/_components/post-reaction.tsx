import { FC } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIncrementLikeMutation, useGetLikeStatusQuery } from "@/queries/reactions";

interface PostReactionProps {
  postId: string;
}

export const PostReaction: FC<PostReactionProps> = ({ postId }) => {
  const { data: likeStatus, isLoading: isStatusLoading } = useGetLikeStatusQuery(postId);
  const { mutate: incrementLike, isPending } = useIncrementLikeMutation();

  const handleLikeClick = () => {
    if (isPending) return;
    incrementLike(postId);
  };

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
          <div className="flex items-center gap-2 rounded-full bg-background/95 px-6 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 