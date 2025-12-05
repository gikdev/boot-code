import { CheckIcon, CursorTextIcon } from "@phosphor-icons/react"
import { useState } from "react"
import Markdown from "react-markdown"
import { IconBtn } from "#/components/ui/button"
import { Textarea } from "#/components/ui/textarea"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockTextProps extends BlockTypeBaseProps {}

export function BlockText({ block, isEditMode = false }: BlockTextProps) {
  const dispatch = useAppDispatch()
  const [textareaValue, setTextareaValue] = useState("")
  const [isEditing, setEditing] = useState(false)

  if (block.type !== BlockTypes.Text) return null

  const handleTextBtnClick = () => {
    // Is going to be saved
    if (isEditing) {
      const clone = structuredClone(block)
      clone.content = textareaValue

      dispatch(updateBlock(clone))

      setEditing(false)
    }
    // Is going to be opened
    else {
      setTextareaValue(block.content)

      setEditing(true)
    }
  }

  return (
    <BlockBase
      block={block}
      isEditMode={isEditMode}
      rendered={
        <div dir="auto">
          {isEditing ? (
            <Textarea
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
            />
          ) : (
            <Markdown>{block.content}</Markdown>
          )}
        </div>
      }
      controls={
        <IconBtn size="icon-xs" onClick={handleTextBtnClick}>
          {isEditing ? <CheckIcon /> : <CursorTextIcon />}
        </IconBtn>
      }
    />
  )
}
