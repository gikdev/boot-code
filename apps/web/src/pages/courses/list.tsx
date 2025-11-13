import { PlusIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { getApiV1CoursesOptions } from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { CourseCard } from "#/components/course-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { main, phonePage } from "#/lib/skins"

export const CoursesListPage = () => (
  <div className={phonePage()}>
    <AppBar title="دوره‌ها" />

    <div className={main()}>
      <CoursesList />

      <FabMenuWrapper />
    </div>

    <BottomTabs />
  </div>
)

function CoursesList() {
  const { data, status, refetch } = useQuery(getApiV1CoursesOptions())

  const isFull = status === "success" && data.items.length !== 0

  switch (status) {
    case "pending":
      return <CourseCard.ListSkeleton />

    case "error":
      return <ErrorParagraph onClick={() => void refetch()} />

    case "success":
      return isFull ? (
        <CourseCard.List courses={data.items} />
      ) : (
        <CourseCard.Empty />
      )
  }
}

function FabMenuWrapper() {
  const navigate = useNavigate()
  const [isFabOpen, setFabOpen] = useState(false)
  const items = useMemo(
    () =>
      [
        {
          key: "new",
          label: "دوره جدید",
          theme: "secondary-success",
          icon: PlusIcon,
          onClick: () => navigate({ to: "/courses/new" }),
          closeAfterClick: true,
        },
      ] satisfies FabItem[],
    [navigate],
  )

  return (
    <RequireRole roles={["admin"]}>
      <FabMenu
        items={items}
        isOpen={isFabOpen}
        onClick={() => setFabOpen(p => !p)}
      />
    </RequireRole>
  )
}
