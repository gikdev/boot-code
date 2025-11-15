import { createFileRoute } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { ManageAssetsPage } from "#/pages/assets/manage"

export const Route = createFileRoute("/_app/assets/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <ManageAssetsPage />
    </RequireRole>
  )
}
