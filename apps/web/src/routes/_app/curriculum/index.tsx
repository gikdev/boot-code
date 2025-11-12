import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getApiV1CurriculaByIdOptions } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { ErrorParagraph } from "#/components/error-paragraph"
import { LessonCard } from "#/components/lesson-card"
import { list, phonePage } from "#/lib/skins"

export const Route = createFileRoute("/_app/curriculum/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isSuccess, isError, isPending, refetch } = useQuery(
    getApiV1CurriculaByIdOptions({ path: { id: 1 } }),
  )

  const isEmpty = isSuccess && data.steps.length === 0
  const isFull = isSuccess && data.steps.length !== 0

  return (
    <div className={phonePage()}>
      <AppBar title="مسیر" />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <LessonCard.ListSkeleton />}

        {isEmpty && <LessonCard.Empty />}

        {isFull && (
          // biome-ignore lint/suspicious/noExplicitAny: TODO
          <LessonCard.List lessons={data.steps.map(s => (s as any)?.lesson)} />
        )}
      </div>

      <BottomTabs />
    </div>
  )
}
