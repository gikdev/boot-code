import { createFileRoute } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { CreateCoursePage } from "#/pages/create-course"

export const Route = createFileRoute("/_app/courses/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <CreateCoursePage />
    </RequireRole>
  )
}
