import { PlusIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { getApiV1CoursesOptions } from "#/api/generated/client"
import { Can } from "#/auth"
import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { CourseCard } from "#/components/course-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { main, phonePage } from "#/lib/skins"

export function CoursesPage() {
  // const navToNewCoursePage = useNavigateTo(nav => nav({ to: "/courses/new" }))
  const [isFabOpen, setFabOpen] = useState(false)
  const { data, isSuccess, isError, isPending, refetch } = useQuery(
    getApiV1CoursesOptions(),
  )

  const isEmpty = isSuccess && data.items.length === 0
  const isFull = isSuccess && data.items.length !== 0

  const items = useMemo(
    () =>
      [
        {
          key: "new",
          label: "دوره جدید",
          theme: "secondary-success",
          icon: PlusIcon,
          // onClick: navToNewCoursePage,
          onClick: () => {},
          closeAfterClick: true,
        },
      ] satisfies FabItem[],
    [
      // navToNewCoursePage
    ],
  )

  return (
    <div className={phonePage()}>
      <AppBar title="دوره‌ها" />

      <div className={main({ className: "relative" })}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <CourseCard.ListSkeleton />}

        {isEmpty && <CourseCard.Empty />}

        {isFull && <CourseCard.List courses={data.items} />}

        <Can I="MANAGE" a="COURSE">
          <FabMenu
            items={items}
            isOpen={isFabOpen}
            onClick={() => setFabOpen(p => !p)}
          />
        </Can>
      </div>

      <BottomTabs />
    </div>
  )
}
