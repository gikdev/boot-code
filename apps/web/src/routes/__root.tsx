import { createRootRoute, Outlet } from "@tanstack/react-router"
import { Devtools } from "#/integrations/devtools"
import { TanStackQueryProvider } from "#/integrations/tanstack-query"
import { Toast } from "#/integrations/toast"
import { AppStoreProvider } from "#/store"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <AppStoreProvider>
      <TanStackQueryProvider>
        <Outlet />
        <Toast />
        <Devtools />
      </TanStackQueryProvider>
    </AppStoreProvider>
  )
}
