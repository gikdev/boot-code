import { createFileRoute, Navigate } from "@tanstack/react-router"
import { strToNullableNum } from "#/lib/utils"
import { LessonDetailsPage } from "#/pages/lessons/details"

export const Route = createFileRoute("/_app/lessons/$lessonId/")({
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

  return <LessonDetailsPage lessonId={lessonId} />
}
