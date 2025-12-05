import { createFileRoute, Navigate } from "@tanstack/react-router"
import { strToNullableNum } from "#/lib/utils"
import { CourseDetailsPage } from "#/pages/courses/details"

export const Route = createFileRoute("/_app/courses/$courseId/")({
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

  return <CourseDetailsPage id={courseId} />
}
