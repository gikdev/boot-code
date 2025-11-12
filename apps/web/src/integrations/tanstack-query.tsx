import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

export const queryClient = new QueryClient()

export const TanStackQueryProvider = (p: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  )
}
