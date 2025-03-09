import { reactionsApi } from "@/services/reactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type LikeStatus = {
  userLikes: number;
  totalLikes: number;
  canLikeMore: boolean;
};

export const useGetLikeStatusQuery = (postId: string) => {
  return useQuery<LikeStatus>({
    queryKey: ["reactions", postId],
    queryFn: async () => {
      const { data } = await reactionsApi.getReactions(postId);
      return data;
    },
    retry: false,
  });
};

export const useIncrementLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeStatus, Error, string, { previousLikes?: LikeStatus }>({
    mutationFn: async (postId: string) => {
      const { data } = await reactionsApi.incrementReaction(postId);
      return data;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["reactions", postId] });
      const previousLikes = queryClient.getQueryData<LikeStatus>(["reactions", postId]);

      if (previousLikes) {
        const optimisticUpdate = {
          ...previousLikes,
          userLikes: previousLikes.userLikes === 1 ? 0 : 1,
          totalLikes: previousLikes.userLikes === 1 
            ? previousLikes.totalLikes - 1 
            : previousLikes.totalLikes + 1,
        };
        queryClient.setQueryData<LikeStatus>(["reactions", postId], optimisticUpdate);
      }

      return { previousLikes };
    },
    onError: (err, postId, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData<LikeStatus>(["reactions", postId], context.previousLikes);
      }
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
    },
  });
};
