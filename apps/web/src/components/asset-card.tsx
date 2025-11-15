import {
  EyeIcon,
  EyeSlashIcon,
  FileIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react"
import { type MouseEvent, useState } from "react"
import type { AssetRes } from "#/api/generated/client"
import { iconBtn } from "#/lib/skins"
import { AssetRenderer } from "./asset-renderer"
import { Skeleton } from "./ui/skeleton"

// const container = tv({ base: `flex flex-col gap:2x` })

type EventHandlers = {
  onNameClick?: (e: MouseEvent<HTMLElement>) => void
  onDeleteBtnClick?: (id: AssetRes["id"]) => void
}

type AssetCardsListProps = {
  assets: AssetRes[]
} & EventHandlers

type AssetCardCoreProps = {
  asset: AssetRes
} & EventHandlers

export const AssetCard = {
  Core: ({ asset, onDeleteBtnClick, onNameClick }: AssetCardCoreProps) => {
    const [isPreviewOpen, setPreviewOpen] = useState(false)

    return (
      <div className="flex flex-col gap:1x p:2x r:1.5x">
        <div className="flex items-center gap:1x fg:grey-90">
          <code>{`{${asset.id}}`}</code>

          <p className="flex:1">{asset.description || "---"}</p>
        </div>

        <div className="flex items-center justify-between gap:1x font:mono font:xs flex-wrap:wrap">
          <button
            type="button"
            className="cursor:pointer "
            onClick={onNameClick}
          >
            {asset.name}
          </button>

          <span className="">{asset.mimeType}</span>
        </div>

        <div className="flex items-center justify-end gap:2x">
          <button
            type="button"
            className={iconBtn({ size: 8 })}
            onClick={() => setPreviewOpen(p => !p)}
          >
            {isPreviewOpen ? <EyeSlashIcon /> : <EyeIcon />}
          </button>

          <button
            type="button"
            className={iconBtn({ size: 8 })}
            onClick={() => onDeleteBtnClick?.(asset.id)}
          >
            <TrashSimpleIcon />
          </button>
        </div>

        {isPreviewOpen && (
          <div className="bg:grey-5 p:4x r:2x">
            <AssetRenderer idOrName={asset.id} mimeType={asset.mimeType} />
          </div>
        )}
      </div>
    )
  },

  Skeleton: () => (
    <li className="flex flex-col gap:1x p:2x r:1.5x">
      <div className="flex items-center gap:1x fg:grey-90">
        <Skeleton className="h:4x w:full" />
      </div>

      <div className="flex items-center justify-between gap:1x font:mono font:xs flex-wrap:wrap">
        <Skeleton className="h:4x w:full" />
      </div>

      <div className="flex items-center justify-end gap:2x">
        <Skeleton className="h:8x w:8x" />
        <Skeleton className="h:8x w:8x" />
      </div>
    </li>
  ),

  List: ({ assets, onDeleteBtnClick, onNameClick }: AssetCardsListProps) => (
    <>
      {assets.map(asset => (
        <AssetCard.Core
          key={asset.id}
          asset={asset}
          onDeleteBtnClick={onDeleteBtnClick}
          onNameClick={onNameClick}
        />
      ))}
    </>
  ),

  ListSkeleton: () => (
    <>
      <AssetCard.Skeleton />
      <AssetCard.Skeleton />
      <AssetCard.Skeleton />
      <AssetCard.Skeleton />
    </>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p:4x gap:2x">
      <FileIcon size={24} />
      <p>فعلا فایلی نداریم.</p>
    </div>
  ),
}
