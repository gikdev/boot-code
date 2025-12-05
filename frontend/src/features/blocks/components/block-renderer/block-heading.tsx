import { CheckIcon, CursorTextIcon, TextHIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { IconBtn } from "#/components/ui/button"
import { Textarea } from "#/components/ui/textarea"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockHeadingProps extends BlockTypeBaseProps {}

export function BlockHeading({ block, isEditMode = false }: BlockHeadingProps) {
  const dispatch = useAppDispatch()
  const [textareaValue, setTextareaValue] = useState("")
  const [isEditing, setEditing] = useState(false)

  if (block.type !== BlockTypes.Heading) return null

  const className = `font:${headingLevelMap[block.level]} font:bold fg:grey-90`

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

  const handleChangeLevel = () => {
    let level = window.prompt("Level (2, 3, 4):", block.level) as
      | "2"
      | "3"
      | "4"
      | null

    if (level == null) return

    level = level && ["2", "3", "4"].includes(level) ? level : "4"

    const clone = structuredClone(block)
    clone.level = level

    dispatch(updateBlock(clone))
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
            <p className={className}>{block.content}</p>
          )}
        </div>
      }
      controls={
        <>
          <IconBtn size="icon-xs" onClick={handleTextBtnClick}>
            {isEditing ? <CheckIcon /> : <CursorTextIcon />}
          </IconBtn>

          <IconBtn size="icon-xs" onClick={handleChangeLevel}>
            <TextHIcon />
          </IconBtn>
        </>
      }
    />
  )
}

const headingLevelMap = {
  "2": "2xl",
  "3": "xl",
  "4": "lg",
}
