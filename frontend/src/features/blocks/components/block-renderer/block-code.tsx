import { CheckIcon, CursorTextIcon, TranslateIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { IconBtn } from "#/components/ui/button"
import { Textarea } from "#/components/ui/textarea"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockCodeProps extends BlockTypeBaseProps {}

export function BlockCode({ block, isEditMode = false }: BlockCodeProps) {
  const dispatch = useAppDispatch()
  const [textareaValue, setTextareaValue] = useState("")
  const [isEditing, setEditing] = useState(false)

  if (block.type !== BlockTypes.Code) return null

  const onLangChange = () => {
    const lang = window.prompt("Enter language code:", block.language)
    if (!lang) return

    const clone = structuredClone(block)
    clone.language = lang

    dispatch(updateBlock(clone))
  }

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
              className="font:mono"
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
            />
          ) : (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={block.language}
              customStyle={{ borderRadius: 8 }}
            >
              {block.content}
            </SyntaxHighlighter>
          )}
        </div>
      }
      controls={
        <>
          <IconBtn size="icon-xs" onClick={handleTextBtnClick}>
            {isEditing ? <CheckIcon /> : <CursorTextIcon />}
          </IconBtn>

          <IconBtn size="icon-xs" onClick={onLangChange}>
            <TranslateIcon />
          </IconBtn>
        </>
      }
    />
  )
}
