import { createFileRoute, Navigate } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { useNavigateTo } from "#/lib/hooks"
import { strToNullableNum } from "#/lib/utils"
import { WriteLessonPage } from "#/pages/lessons/write/page"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/lessons/$lessonId/write",
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
  const goBack = useNavigateTo(nav =>
    nav({
      to: "/courses/$courseId/modules/$moduleId/lessons/$lessonId",
      params: { courseId, lessonId, moduleId },
    }),
  )

  if (typeof courseId !== "number") return <Navigate to="/" />
  if (typeof moduleId !== "number") return <Navigate to="/" />
  if (typeof lessonId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <WriteLessonPage lessonId={lessonId} goBack={goBack} />
    </RequireRole>
  )
}
