import { FileDashedIcon } from "@phosphor-icons/react"
import { AssetRenderer } from "#/components/asset-renderer"
import { IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockVideoProps extends BlockTypeBaseProps {}

export function BlockVideo({ block, isEditMode = false }: BlockVideoProps) {
  const dispatch = useAppDispatch()

  if (block.type !== BlockTypes.Video) return null

  const handleEditFile = () => {
    const clone = structuredClone(block)
    const newGuid = window.prompt("Paste the video GUID:", block.fileGuid)
    if (!newGuid) return
    clone.fileGuid = newGuid
    dispatch(updateBlock(clone))
  }

  return (
    <BlockBase
      block={block}
      isEditMode={isEditMode}
      rendered={
        <AssetRenderer
          idOrName={block.fileGuid}
          mimeType="video/*"
          className="w:full"
        />
      }
      controls={
        <IconBtn size="icon-xs" onClick={handleEditFile}>
          <FileDashedIcon />
        </IconBtn>
      }
    />
  )
}
