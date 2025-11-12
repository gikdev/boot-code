import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getApiV1CoursesByIdOptions } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/lib/hooks"
import { list, phonePage } from "#/lib/skins"
import { CourseForm, select } from "../-course-form"

export const Route = createFileRoute("/_app/courses/$id/edit")({
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
  const {
    data: defaultValues,
    isError,
    refetch,
  } = useQuery({
    ...getApiV1CoursesByIdOptions({ path: { id } }),
    select,
  })

  return (
    <div className={phonePage()}>
      <AppBar title="ویرایش دوره" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={refetch} />}

        {defaultValues ? (
          <CourseForm
            mode="edit"
            courseId={id}
            defaultValues={defaultValues}
            onSuccess={navBack}
          />
        ) : (
          <SpinnerGapIcon size={40} className="@rotate|1s|infinite|linear" />
        )}
      </div>
    </div>
  )
}
