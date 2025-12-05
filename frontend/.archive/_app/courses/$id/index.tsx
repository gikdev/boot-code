import { PenIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import {
  deleteApiV1CoursesByIdMutation,
  getApiV1CoursesByIdModulesOptions,
  getApiV1CoursesByIdOptions,
} from "#/api/generated/client"
import { Can } from "#/auth"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { LessonCard } from "#/components/lesson-card"
import { extractErrorMessage } from "#/lib/errors"
import { list, phonePage } from "#/lib/skins"

export const Route = createFileRoute("/_app/courses/$id/")({
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
  const courseRes = useQuery(getApiV1CoursesByIdOptions({ path: { id } }))
  const modulesRes = useQuery(
    getApiV1CoursesByIdModulesOptions({ path: { id } }),
  )

  const isEmpty = modulesRes.isSuccess && modulesRes.data.items.length === 0
  const isFull = modulesRes.isSuccess && modulesRes.data.items.length !== 0
  const isError = courseRes.isError || modulesRes.isError
  const isPending = courseRes.isPending || modulesRes.isPending

  const refetch = () => {
    courseRes.refetch()
    modulesRes.refetch()
  }

  return (
    <div className={phonePage({ className: "relative" })}>
      <AppBar
        title={courseRes.data?.title || ""}
        isLoading={courseRes.isSuccess}
        slotStart={<GoBackNavBtn onClick={n => n({ to: "/courses" })} />}
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={refetch} />}
        {isPending && <LessonCard.ListSkeleton />}
        {isEmpty && <LessonCard.Empty />}
        {isFull && <LessonCard.List lessons={modulesRes.data.items} />}
      </div>

      <FabMenuWrapper id={id} />
    </div>
  )
}

function FabMenuWrapper({ id }: { id: number }) {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(p => !p)
  const { mutate: remove } = useMutation({
    ...deleteApiV1CoursesByIdMutation(),
    onSuccess: () => {
      toast.success("انجام شد!")
      navigate({ to: "/courses" })
    },
    onError: error => {
      toast.error(extractErrorMessage({ error }))
    },
  })

  const items: FabItem[] = useMemo(
    () => [
      {
        key: "delete",
        label: "حذف دوره",
        theme: "secondary-danger",
        icon: TrashIcon,
        closeAfterClick: true,
        onClick: () => {
          if (!confirm("مطمئنی؟")) return
          remove({ path: { id } })
        },
      },
      {
        key: "edit",
        label: "ویرایش دوره",
        theme: "secondary-brand",
        icon: PenIcon,
        closeAfterClick: true,
        onClick: () => {
          navigate({ to: "/courses/$id/edit", params: { id } })
        },
      },
      {
        key: "lessons/new",
        label: "درس جدید",
        theme: "secondary-success",
        icon: PlusIcon,
        closeAfterClick: true,
        onClick: () => {
          navigate({ to: "/courses/$id/lessons/new", params: { id } })
        },
      },
    ],
    [id, remove, navigate],
  )

  return (
    <Can I="MANAGE" a="COURSE">
      <FabMenu isOpen={isOpen} onClick={toggle} items={items} />
    </Can>
  )
}
