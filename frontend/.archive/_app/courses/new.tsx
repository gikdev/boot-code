import { createFileRoute } from "@tanstack/react-router"
import { AppBar } from "#/components/app-bar"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/lib/hooks"
import { list, phonePage } from "#/lib/skins"
import { CourseForm } from "./-course-form"

export const Route = createFileRoute("/_app/courses/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navBack = useNavigateTo(nav => nav({ to: "/courses" }))

  return (
    <div className={phonePage()}>
      <AppBar title="دوره جدید" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        <CourseForm mode="create" onSuccess={navBack} />
      </div>
    </div>
  )
}
