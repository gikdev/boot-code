import { createFileRoute, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { strToNullableNum } from "#/lib/utils"

export const Route = createFileRoute("/_app/lessons/$lessonId/write")({
  component: RouteComponent,
  params: {
    parse: raw => ({
      lessonId: strToNullableNum(raw.lessonId),
    }),
  },
})

function RouteComponent() {
  const { lessonId } = Route.useParams()

  if (typeof lessonId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      Write content...
    </RequireRole>
  )
}
