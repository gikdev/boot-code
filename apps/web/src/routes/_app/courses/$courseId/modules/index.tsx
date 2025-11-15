import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/courses/$courseId/modules/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to=".." />
}
