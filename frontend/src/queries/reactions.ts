import { reactionsApi } from "@/services/reactions";
import { Reaction } from "@/types/reaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReactionStatusQuery = (postId: string) => {
  return useQuery<Reaction>({
    queryKey: ["reactions", postId],
    queryFn: async () => {
      const { data } = await reactionsApi.getReactions(postId);
      return data;
    },
    retry: false,
  });
};

export const useReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Reaction, Error, string, { previousLikes?: Reaction }>({
    mutationFn: async (postId: string) => {
      const { data } = await reactionsApi.incrementReaction(postId);
      return data;
    },

    onError: (_, postId, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData<Reaction>(
          ["reactions", postId],
          context.previousLikes
        );
      }
    },
  });
};
