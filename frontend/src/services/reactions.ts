import { axiosInstance } from "@/lib/axios";

const ENDPOINTS = {
  GET_REACTIONS: (postId: string) => `api/reactions/${postId}/status`,
  INCREMENT_REACTION: (postId: string) => `api/reactions/${postId}/increment`,
  RESET_REACTIONS: (postId: string) => `api/reactions/${postId}/reset`,
} as const;

export const reactionsApi = {
  getReactions: async (postId: string) => {
    return axiosInstance.get(ENDPOINTS.GET_REACTIONS(postId));
  },

  incrementReaction: async (postId: string) => {
    return axiosInstance.post(ENDPOINTS.INCREMENT_REACTION(postId));
  },

  resetReactions: async (postId: string) => {
    return axiosInstance.delete(ENDPOINTS.RESET_REACTIONS(postId));
  },
};
