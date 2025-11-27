import { Activity, type ReactNode, useState } from "react"
import type { Block } from "../../types"
import { ControlsLayer } from "./controls-layer"
import { BlockBtnLayer, BlockContainer } from "./shared"

export interface BlockTypeBaseProps {
  block: Block
  isEditMode?: boolean
}

interface BlockBaseProps {
  rendered: ReactNode
  controls: ReactNode
  isEditMode?: boolean
  block: Block
}

export function BlockBase({
  rendered,
  controls,
  isEditMode = false,
  block,
}: BlockBaseProps) {
  const [isOpen, setOpen] = useState(false)

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return (
    <BlockContainer>
      {rendered}

      <Activity mode={isEditMode ? "visible" : "hidden"}>
        {isOpen ? (
          <ControlsLayer block={block} onClose={close}>
            {controls}
          </ControlsLayer>
        ) : (
          <BlockBtnLayer onClick={open} />
        )}
      </Activity>
    </BlockContainer>
  )
}
