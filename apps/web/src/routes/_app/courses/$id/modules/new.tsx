import { createFileRoute, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { CreateModulePage } from "#/pages/modules/create"

export const Route = createFileRoute("/_app/courses/$id/modules/new")({
  component: RouteComponent,
  params: {
    parse: raw => {
      const parsed = Number(raw.id)
      const isNan = Number.isNaN(parsed)
      const id = isNan ? null : parsed

      return { id }
    },
  },
})

function RouteComponent() {
  const { id } = Route.useParams()

  if (typeof id !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]}>
      <CreateModulePage courseId={id} />
    </RequireRole>
  )
}
