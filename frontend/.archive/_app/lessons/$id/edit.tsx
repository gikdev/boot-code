import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getApiV1LessonsByIdOptions } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/lib/hooks"
import { list, phonePage } from "#/lib/skins"
import { LessonForm, select } from "../-lesson-form"

export const Route = createFileRoute("/_app/lessons/$id/edit")({
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
  const { data: defaultValues } = useQuery({
    ...getApiV1LessonsByIdOptions({ path: { id } }),
    select,
  })
  const navBack = useNavigateTo(nav =>
    nav({ to: "/lessons/$id", params: { id } }),
  )

  return (
    <div className={phonePage()}>
      <AppBar title="ویرایش درس" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        {defaultValues ? (
          <LessonForm
            mode="edit"
            courseId={id}
            onSuccess={navBack}
            defaultValues={defaultValues}
          />
        ) : (
          <SpinnerGapIcon size={40} className="animate-spin" />
        )}
      </div>
    </div>
  )
}
