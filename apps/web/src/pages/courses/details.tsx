import { PencilSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import {
  type CourseFullRes,
  deleteApiV1CoursesByIdMutation,
  getApiV1CoursesByIdOptions,
  getApiV1CoursesOptions,
} from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { AppBar } from "#/components/app-bar"
import { AssetRenderer } from "#/components/asset-renderer"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { ModuleCard } from "#/components/module-card"
import { Spinner } from "#/components/spinner"
import { extractErrorMessage } from "#/lib/errors"
import { main, phonePage } from "#/lib/skins"

interface CourseDetailsPageProps {
  id: number
}

export function CourseDetailsPage({ id }: CourseDetailsPageProps) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="دوره"
        slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/courses" })} />}
      />

      <div className={main()}>
        <CourseDetailsWrapper id={id} />

        <FabMenuWrapper id={id} />
      </div>
    </div>
  )
}

function CourseDetailsWrapper({ id }: { id: number }) {
  const { data, status, refetch } = useQuery(
    getApiV1CoursesByIdOptions({ path: { id } }),
  )

  switch (status) {
    case "pending":
      return <Spinner />

    case "error":
      return <ErrorParagraph onClick={() => void refetch()} />

    case "success":
      return <CourseDetails {...data} />
  }
}

function CourseDetails({
  title,
  thumbnail,
  description,
  modules,
}: CourseFullRes) {
  return (
    <div className="flex flex-col gap:2x">
      <AssetRenderer
        idOrName={thumbnail.id}
        mimeType={thumbnail.mimeType}
        className="r:2x video obj:cover"
      />

      <p className="font:bold font:3xl fg:grey-90">{title}</p>

      {description ? <p>{description}</p> : <p>(بدون توضیحات)</p>}

      <p>تعداد فصل‌ها: {modules.length}</p>

      {modules.length > 0 ? (
        <ModuleCard.List modules={modules} />
      ) : (
        <ModuleCard.Empty />
      )}
    </div>
  )
}

function FabMenuWrapper({ id }: { id: number }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isFabOpen, setFabOpen] = useState(false)

  const { mutate: deleteCourse } = useMutation({
    ...deleteApiV1CoursesByIdMutation(),
    onError: error => toast.error(extractErrorMessage({ error })),
    onSuccess() {
      queryClient.invalidateQueries(getApiV1CoursesOptions())

      toast.success("پاک شد.")
      navigate({ to: "/courses" })
    },
  })

  const items = useMemo(
    () =>
      [
        {
          key: "delete-course",
          label: "حذف دوره",
          icon: TrashIcon,
          closeAfterClick: true,
          theme: "secondary-danger",
          onClick: () => {
            const shouldContinue = window.confirm("Sure?")
            if (!shouldContinue) return
            deleteCourse({ path: { id } })
          },
        },
        {
          key: "edit-course",
          label: "ویرایش دوره",
          icon: PencilSimpleIcon,
          closeAfterClick: true,
          theme: "secondary-neutral",
          onClick: () => {
            navigate({ to: "/courses/$id/edit", params: { id } })
          },
        },
        {
          key: "new-module",
          label: "فصل جدید",
          closeAfterClick: true,
          icon: PlusIcon,
          theme: "secondary-success",
          onClick: () => {
            navigate({ to: "/courses/$id/modules/new", params: { id } })
          },
        },
      ] satisfies FabItem[],
    [deleteCourse, id, navigate],
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
