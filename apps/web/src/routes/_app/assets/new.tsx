import { createFileRoute } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { UploadAssetsPage } from "#/pages/upload-assets"

export const Route = createFileRoute("/_app/assets/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <UploadAssetsPage />
    </RequireRole>
  )
}
