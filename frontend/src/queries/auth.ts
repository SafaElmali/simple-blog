import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth";
import { Login } from "@/types/auth";

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationFn: (data: Login) => authApi.login(data),
  });

  return { loginMutation };
};
