import { createFileRoute, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { strToNullableNum } from "#/lib/utils"
import { CreateModulePage } from "#/pages/modules/create"

export const Route = createFileRoute("/_app/courses/$courseId/modules/new")({
  component: RouteComponent,
  params: {
    parse: raw => ({
      courseId: strToNullableNum(raw.courseId),
    }),
  },
})

function RouteComponent() {
  const { courseId } = Route.useParams()

  if (typeof courseId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]}>
      <CreateModulePage courseId={courseId} />
    </RequireRole>
  )
}
