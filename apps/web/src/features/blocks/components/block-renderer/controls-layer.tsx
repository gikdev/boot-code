import {
  CaretDownIcon,
  CaretUpIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import type { Block } from "../../types"
import { ControlLayerContainer } from "./shared"

const { moveDown, moveUp, removeBlock } = writeLessonSlice.actions

interface ControlsLayerProps {
  block: Block
  children: ReactNode
  onClose: () => void
}

export function ControlsLayer({
  block,
  onClose,
  children,
}: ControlsLayerProps) {
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

      {children}

      <IconBtn className="mr:auto" size="icon-xs" onClick={onClose}>
        <XIcon />
      </IconBtn>
    </ControlLayerContainer>
  )
}
