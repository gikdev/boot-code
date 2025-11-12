import { createFileRoute } from "@tanstack/react-router"
import { AppBar } from "#/components/app-bar"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/lib/hooks"
import { list, phonePage } from "#/lib/skins"
import { LessonForm } from "../../lessons/-lesson-form"

export const Route = createFileRoute("/_app/courses/$id/lessons/new")({
  component: RouteComponent,
  params: {
    parse: ({ id }) => {
      const num = Number(id)
      const finalId = Number.isNaN(num) ? 0 : num
      return { id: finalId }
    },
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navBack = useNavigateTo(nav =>
    nav({ to: "/courses/$id", params: { id } }),
  )

  return (
    <div className={phonePage()}>
      <AppBar title="درس جدید" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        <LessonForm mode="create" courseId={id} onSuccess={navBack} />
      </div>
    </div>
  )
}
