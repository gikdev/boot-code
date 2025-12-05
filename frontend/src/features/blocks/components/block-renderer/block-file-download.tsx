import { CursorTextIcon, FileDashedIcon } from "@phosphor-icons/react"
import { buttonVariants, IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockFileDownloadProps extends BlockTypeBaseProps {}

export function BlockFileDownload({
  block,
  isEditMode = false,
}: BlockFileDownloadProps) {
  const dispatch = useAppDispatch()

  if (block.type !== BlockTypes.FileDownload) return null

  const href = `/api/v1/assets/${block.fileGuid}/file?download=true`

  const onLabelChange = () => {
    const label = window.prompt("Enter label:", block.label)
    if (!label) return

    const clone = structuredClone(block)
    clone.label = label

    dispatch(updateBlock(clone))
  }

  const onFileGuidChange = () => {
    const clone = structuredClone(block)
    const newGuid = window.prompt("Paste the file GUID:", block.fileGuid)
    if (!newGuid) return
    clone.fileGuid = newGuid
    dispatch(updateBlock(clone))
  }

  return (
    <BlockBase
      block={block}
      isEditMode={isEditMode}
      rendered={
        <a download href={href} className={buttonVariants()}>
          {block.label}
        </a>
      }
      controls={
        <>
          <IconBtn size="icon-xs" onClick={onFileGuidChange}>
            <FileDashedIcon />
          </IconBtn>

          <IconBtn size="icon-xs" onClick={onLabelChange}>
            <CursorTextIcon />
          </IconBtn>
        </>
      }
    />
  )
}
