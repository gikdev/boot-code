import {
  ArrowsLeftRightIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { linkOptions, useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { toast } from "react-toastify"
import {
  deleteApiV1ModulesByIdMutation,
  getApiV1ModulesByIdOptions,
  type LessonRes,
  type ModuleFullRes,
} from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { LessonCard } from "#/components/lesson-card"
import { Skeleton } from "#/components/ui/skeleton"
import { extractErrorMessage } from "#/lib/errors"
import { main, phonePage } from "#/lib/skins"
import { sortByPosition } from "#/lib/utils"

interface PageProps {
  courseId: number
  moduleId: number
}

export function ModuleDetailsPage({ courseId, moduleId }: PageProps) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="فصل"
        slotStart={<GoBackNavBtn onClick={nav => nav({ to: ".." })} />}
      />

      <div className={main()}>
        <ModuleDetailsWrapper id={moduleId} />

        <FabMenuWrapper moduleId={moduleId} courseId={courseId} />
      </div>
    </div>
  )
}

function ModuleDetailsWrapper({ id }: { id: number }) {
  const { data, status, refetch } = useQuery(
    getApiV1ModulesByIdOptions({ path: { id } }),
  )

  switch (status) {
    case "pending":
      return <ModuleDetailsSkeleton />

    case "error":
      return <ErrorParagraph onClick={() => void refetch()} />

    case "success":
      return <ModuleDetails {...data} />
  }
}

function ModuleDetailsSkeleton() {
  return (
    <div className="flex flex-col gap:2x">
      <Skeleton className="h:8x" />
      <Skeleton className="h:4x" />
      <LessonCard.ListSkeleton />
    </div>
  )
}

function ModuleDetails({
  title,
  description,
  lessons,
  courseId,
}: ModuleFullRes) {
  return (
    <div className="flex flex-col gap:2x">
      <p className="font:bold font:3xl fg:grey-90">{title}</p>

      {description ? <p>{description}</p> : <p>(بدون توضیحات)</p>}

      <p>
        <span>تعداد دروس: </span>
        <span>{lessons.length}</span>
      </p>

      <LessonsList courseId={courseId} lessons={lessons} />
    </div>
  )
}

interface LessonListProps {
  lessons: LessonRes[]
  courseId: number
}

function LessonsList({ lessons, courseId }: LessonListProps) {
  const readyLessons = sortByPosition(lessons).map(l => ({
    ...l,
    detailsPageLinkOptions: linkOptions({
      to: "/courses/$courseId/modules/$moduleId/lessons/$lessonId",
      params: { courseId, lessonId: l.id, moduleId: l.moduleId },
    }),
  }))

  return readyLessons.length > 0 ? (
    <LessonCard.List courseId={courseId} lessons={readyLessons} />
  ) : (
    <LessonCard.Empty />
  )
}

function FabMenuWrapper({ courseId, moduleId }: PageProps) {
  const navigate = useNavigate()
  const { mutate: remove } = useMutation({
    ...deleteApiV1ModulesByIdMutation(),
    onError: error => toast.error(extractErrorMessage({ error })),
    onSuccess() {
      toast.success("پاک شد.")
      navigate({ to: ".." })
    },
  })

  const items = useMemo(
    () =>
      [
        {
          key: "delete-module",
          label: "حذف فصل",
          icon: TrashIcon,
          closeAfterClick: true,
          theme: "secondary-danger",
          onClick: () => {
            const shouldContinue = window.confirm("Sure?")
            if (!shouldContinue) return
            remove({ path: { id: moduleId } })
          },
        },
        {
          key: "edit-module",
          label: "ویرایش فصل",
          icon: PencilSimpleIcon,
          closeAfterClick: true,
          theme: "secondary-neutral",
          onClick: () => {
            navigate({
              to: "/courses/$courseId/modules/$moduleId/edit",
              params: { courseId, moduleId },
            })
          },
        },
        {
          key: "reorder-lessons",
          label: "مرتب‌کردن درس‌ها",
          closeAfterClick: true,
          icon: ArrowsLeftRightIcon,
          theme: "secondary-neutral",
          onClick: () => {
            navigate({
              to: "/courses/$courseId/modules/$moduleId/reorder",
              params: { courseId, moduleId },
            })
          },
        },
        {
          key: "new-lesson",
          label: "درس جدید",
          closeAfterClick: true,
          icon: PlusIcon,
          theme: "secondary-success",
          onClick: () => {
            navigate({
              to: "/courses/$courseId/modules/$moduleId/lessons/new",
              params: { courseId, moduleId },
            })
          },
        },
      ] satisfies FabItem[],
    [remove, courseId, moduleId, navigate],
  )

  return (
    <RequireRole roles={["admin"]}>
      <FabMenu items={items} />
    </RequireRole>
  )
}
