"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { ReactQueryProvider };
