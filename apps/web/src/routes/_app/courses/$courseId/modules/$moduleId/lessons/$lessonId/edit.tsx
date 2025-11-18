import { createFileRoute, linkOptions, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { strToNullableNum } from "#/lib/utils"
import { EditLessonPage } from "#/pages/lessons/edit"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/lessons/$lessonId/edit",
)({
  component: RouteComponent,
  params: {
    parse: raw => ({
      courseId: strToNullableNum(raw.courseId),
      moduleId: strToNullableNum(raw.moduleId),
      lessonId: strToNullableNum(raw.lessonId),
    }),
  },
})

function RouteComponent() {
  const { lessonId, courseId, moduleId } = Route.useParams()

  if (typeof courseId !== "number") return <Navigate to="/" />
  if (typeof moduleId !== "number") return <Navigate to="/" />
  if (typeof lessonId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <EditLessonPage
        lessonId={lessonId}
        goBackHref={
          linkOptions({
            to: "/courses/$courseId/modules/$moduleId/lessons/$lessonId",
            params: {
              courseId,
              moduleId,
              lessonId,
            },
          }).to
        }
      />
    </RequireRole>
  )
}
