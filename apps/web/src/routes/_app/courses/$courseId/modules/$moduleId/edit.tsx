import { RequireRole } from "#/auth/require-role"
import { strToNullableNum } from "#/lib/utils"
import { EditModulePage } from "#/pages/modules/edit"
import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/edit",
)({
  component: RouteComponent,
  params: {
    parse: raw => ({
      courseId: strToNullableNum(raw.courseId),
      moduleId: strToNullableNum(raw.moduleId),
    }),
  },
})

function RouteComponent() {
  const { courseId, moduleId } = Route.useParams()

  if (typeof courseId !== "number") return <Navigate to="/" />
  if (typeof moduleId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]}>
      <EditModulePage id={moduleId} />
    </RequireRole>
  )
}
