import { createFileRoute, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { strToNullableNum } from "#/lib/utils"
import { EditCoursePage } from "#/pages/courses/edit"

export const Route = createFileRoute("/_app/courses/$courseId/edit")({
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
      <EditCoursePage id={courseId} />
    </RequireRole>
  )
}
