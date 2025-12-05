import { createFileRoute, linkOptions, Navigate } from "@tanstack/react-router"
import { strToNullableNum } from "#/lib/utils"
import { LessonDetailsPage } from "#/pages/lessons/details"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/lessons/$lessonId/",
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
  const { courseId, lessonId, moduleId } = Route.useParams()

  if (typeof courseId !== "number") return <Navigate to="/" />
  if (typeof moduleId !== "number") return <Navigate to="/" />
  if (typeof lessonId !== "number") return <Navigate to="/" />

  return (
    <LessonDetailsPage
      lessonId={lessonId}
      editPageHref={
        linkOptions({
          to: "/courses/$courseId/modules/$moduleId/lessons/$lessonId/edit",
          params: { courseId, lessonId, moduleId },
        }).to
      }
      writePageHref={
        linkOptions({
          to: "/courses/$courseId/modules/$moduleId/lessons/$lessonId/write",
          params: { courseId, lessonId, moduleId },
        }).to
      }
    />
  )
}
