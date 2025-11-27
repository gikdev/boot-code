import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { toast } from "react-toastify"
import {
  deleteApiV1LessonsByIdMutation,
  getApiV1LessonsByIdOptions,
  type LessonFullRes,
} from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { LessonCard } from "#/components/lesson-card"
import { Skeleton } from "#/components/ui/skeleton"
import { BlockRenderer } from "#/features/blocks/components/block-renderer"
import { WriteLessonStateSchema } from "#/features/blocks/slice"
import { extractErrorMessage } from "#/lib/errors"
import { main, phonePage } from "#/lib/skins"

interface PageProps {
  lessonId: number
  editPageHref: string
  writePageHref: string
}

export function LessonDetailsPage(p: PageProps) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="درس"
        slotStart={<GoBackNavBtn onClick={nav => nav({ to: ".." })} />}
      />

      <div className={main()}>
        <LessonDetailsWrapper id={p.lessonId} />

        <FabMenuWrapper {...p} />
      </div>
    </div>
  )
}

function LessonDetailsWrapper({ id }: { id: number }) {
  const { data, status, refetch } = useQuery(
    getApiV1LessonsByIdOptions({ path: { id } }),
  )

  switch (status) {
    case "pending":
      return <LessonDetailsSkeleton />

    case "error":
      return <ErrorParagraph onClick={() => void refetch()} />

    case "success":
      return <LessonDetails {...data} />
  }
}

function LessonDetailsSkeleton() {
  return (
    <div className="flex flex-col gap:2x">
      <Skeleton className="h:8x" />
      <Skeleton className="h:4x" />
      <LessonCard.ListSkeleton />
    </div>
  )
}

function LessonDetails({ title, contentJson }: LessonFullRes) {
  try {
    const content = WriteLessonStateSchema.parse(
      JSON.parse(contentJson ?? "{}"),
    )

    return (
      <div className="flex flex-col gap:2x">
        <p className="font:bold font:3xl fg:grey-90 text:center">{title}</p>

        {content.blocks.map(block => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    )
  } catch {
    console.warn("Parsing contentJSON wasn't successful.")
    return <ErrorParagraph onClick={() => {}} />
  }
}

function FabMenuWrapper({ lessonId, editPageHref, writePageHref }: PageProps) {
  const navigate = useNavigate()
  const { mutate: remove } = useMutation({
    ...deleteApiV1LessonsByIdMutation(),
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
          key: "delete-lesson",
          label: "حذف درس",
          icon: TrashIcon,
          closeAfterClick: true,
          theme: "secondary-danger",
          onClick: () => {
            const shouldContinue = window.confirm("Sure?")
            if (!shouldContinue) return
            remove({ path: { id: lessonId } })
          },
        },
        {
          key: "edit-lesson",
          label: "ویرایش درس",
          icon: PencilSimpleIcon,
          closeAfterClick: true,
          theme: "secondary-neutral",
          onClick: () => navigate({ to: editPageHref }),
        },
        {
          key: "write",
          label: "نوشتن",
          closeAfterClick: true,
          icon: PencilSimpleIcon,
          theme: "secondary-neutral",
          onClick: () => navigate({ to: writePageHref }),
        },
      ] satisfies FabItem[],
    [remove, navigate, lessonId, writePageHref, editPageHref],
  )

  return (
    <RequireRole roles={["admin"]}>
      <FabMenu items={items} />
    </RequireRole>
  )
}
