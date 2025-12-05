import { createFileRoute, Navigate } from "@tanstack/react-router"
import { strToNullableNum } from "#/lib/utils"
import { ModuleDetailsPage } from "#/pages/modules/details"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/",
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

  return <ModuleDetailsPage courseId={courseId} moduleId={moduleId} />
}
