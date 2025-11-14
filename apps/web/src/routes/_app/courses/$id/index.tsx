import { createFileRoute, Navigate } from "@tanstack/react-router"
import { CourseDetailsPage } from "#/pages/courses/details"

export const Route = createFileRoute("/_app/courses/$id/")({
  component: RouteComponent,
  params: {
    parse: raw => {
      const parsed = Number(raw.id)
      const isNan = Number.isNaN(parsed)
      const id = isNan ? null : parsed

      return { id }
    },
  },
})

function RouteComponent() {
  const { id } = Route.useParams()

  if (typeof id !== "number") return <Navigate to="/" />

  return <CourseDetailsPage id={id} />
}
