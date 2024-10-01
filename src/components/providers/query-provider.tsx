import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";

interface QueryProviderProps {
  children: ReactNode;
  customOptions?: DefaultOptions;
}

export const QueryProvider = ({
  children,
  customOptions,
}: QueryProviderProps) => {
  const queryClient = useMemo(() => {
    const defaultOptions: DefaultOptions = {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      mutations: {
        retry: 3,
      },
    };

    return new QueryClient({
      defaultOptions: {
        queries: {
          ...defaultOptions.queries,
          ...customOptions?.queries,
        },
        mutations: {
          ...defaultOptions.mutations,
          ...customOptions?.mutations,
        },
      },
    });
  }, [customOptions]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
