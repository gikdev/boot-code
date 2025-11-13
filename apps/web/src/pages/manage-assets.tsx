import { FilePlusIcon } from "@phosphor-icons/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import {
  type AssetRes,
  type AssetsRes,
  deleteApiV1AssetsByIdMutation,
  getApiV1AssetsOptions,
} from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { AssetCard } from "#/components/asset-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { extractErrorMessage } from "#/lib/errors"
import { main, phonePage } from "#/lib/skins"
import { copyContentToClipboard } from "#/lib/utils"

export const ManageAssetsPage = () => (
  <div className={phonePage()}>
    <AppBar
      title="مدیریت فایل‌ها"
      slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/" })} />}
    />

    <div className={main()}>
      <AssetsList />
    </div>

    <FabMenuWrapper />
  </div>
)

const options = getApiV1AssetsOptions()

function AssetsList() {
  const queryClient = useQueryClient()
  const { data, status, refetch } = useQuery(options)

  const deleteMut = useMutation({
    ...deleteApiV1AssetsByIdMutation(),
    onError: error => toast.error(extractErrorMessage({ error })),
    onSuccess(_, variables) {
      const { id } = variables.path

      queryClient.setQueryData(options.queryKey, deleteAssetFromClient(id))

      toast.success("پاک شد.")
    },
  })

  const isFull = status === "success" && data.items.length !== 0

  const handleDeleteBtnClick = (id: AssetRes["id"]) => {
    const path = { id }
    deleteMut.mutate({ path })
  }

  switch (status) {
    case "pending":
      return <AssetCard.ListSkeleton />

    case "error":
      return <ErrorParagraph onClick={() => void refetch()} />

    case "success":
      return isFull ? (
        <AssetCard.List
          assets={data.items}
          onNameClick={copyContentToClipboard}
          onDeleteBtnClick={handleDeleteBtnClick}
        />
      ) : (
        <AssetCard.Empty />
      )
  }
}

const deleteAssetFromClient =
  (id: number) =>
  (current?: AssetsRes): AssetsRes => {
    const newItems = (current?.items || []).filter(i => {
      const shouldBeKept = i.id !== id

      return shouldBeKept
    })

    return { items: newItems }
  }

function FabMenuWrapper() {
  const navigate = useNavigate()
  const [isFabOpen, setFabOpen] = useState(false)
  const items = useMemo(
    () =>
      [
        {
          key: "new-assets-page",
          label: "فایل جدید",
          closeAfterClick: true,
          theme: "secondary-success",
          icon: FilePlusIcon,
          onClick: () => navigate({ to: "/assets/new" }),
        },
      ] satisfies FabItem[],
    [navigate],
  )

  return (
    <FabMenu
      items={items}
      isOpen={isFabOpen}
      onClick={() => setFabOpen(p => !p)}
    />
  )
}
