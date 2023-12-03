"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
