import {
  CaretDownIcon,
  CaretUpIcon,
  CodeBlockIcon,
  CursorTextIcon,
  FileDashedIcon,
  LinkSimpleIcon,
  TextHFourIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TranslateIcon,
  TrashIcon,
  UserRectangleIcon,
  XIcon,
} from "@phosphor-icons/react"
import { type PropsWithChildren, useState } from "react"
import { IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../slice"
import { type Block, BlockTypes } from "../types"
import { BlockRenderer } from "./block-renderer"

interface BlockControlProps {
  block: Block
}

export function BlockControl({ block }: BlockControlProps) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap:2x rel min-h:12x">
      <BlockRenderer block={block} />

      {isOpen ? (
        <Controls block={block} onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="abs bg:blue-5/0.2 top:0 left:0 right:0 bottom:0 cursor:pointer"
        />
      )}
    </div>
  )
}

interface ControlsProps {
  block: Block
  onClose: () => void
}

const { moveDown, moveUp, removeBlock } = writeLessonSlice.actions

function Controls({ block, onClose }: ControlsProps) {
  return (
    <div className="flex flex-col gap:2x items-center">
      <TypeSpecificControlLayer block={block} onClose={onClose} />

      <MainControlLayer block={block} onClose={onClose} />
    </div>
  )
}

function MainControlLayer({ block, onClose }: ControlsProps) {
  const dispatch = useAppDispatch()

  return (
    <ControlLayerContainer>
      <code className="">{block.position}</code>

      <IconBtn size="icon-xs" onClick={() => dispatch(moveDown(block.id))}>
        <CaretDownIcon />
      </IconBtn>

      <IconBtn size="icon-xs" onClick={() => dispatch(moveUp(block.id))}>
        <CaretUpIcon />
      </IconBtn>

      <IconBtn
        size="icon-xs"
        onClick={() => {
          if (!window.confirm("Sure?")) return
          dispatch(removeBlock(block.id))
        }}
      >
        <TrashIcon />
      </IconBtn>

      <IconBtn className="mr:auto" size="icon-xs" onClick={onClose}>
        <XIcon />
      </IconBtn>
    </ControlLayerContainer>
  )
}

function TypeSpecificControlLayer({ block }: ControlsProps) {
  switch (block.type) {
    case BlockTypes.Text:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <CursorTextIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Image:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <FileDashedIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Audio:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <FileDashedIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Video:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <FileDashedIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.LinkButton:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <CursorTextIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <LinkSimpleIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Code:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <CodeBlockIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <TranslateIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Quote:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <CursorTextIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <UserRectangleIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Heading:
      return (
        <ControlLayerContainer>
          <IconBtn size="icon-xs">
            <CursorTextIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <TextHOneIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <TextHTwoIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <TextHThreeIcon />
          </IconBtn>

          <IconBtn size="icon-xs">
            <TextHFourIcon />
          </IconBtn>
        </ControlLayerContainer>
      )

    case BlockTypes.Separator:
      return null

    default:
      return null
  }
}

const ControlLayerContainer = ({ children }: PropsWithChildren) => (
  <div className="flex gap:2x items-center w:full">{children}</div>
)
