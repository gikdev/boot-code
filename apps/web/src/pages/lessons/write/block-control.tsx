import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@phosphor-icons/react"
import { iconBtn } from "#/lib/skins"
import { useAppDispatch } from "#/store"
import { BlockRenderer } from "./block-renderer"
import type { Block } from "./blocks"
import { writeLessonSlice } from "./slice"

interface BlockControlProps {
  block: Block
}

export function BlockControl({ block }: BlockControlProps) {
  return (
    <div className="flex flex-col gap:2x">
      <BlockRenderer block={block} />
      <Controls block={block} />
    </div>
  )
}

interface ControlsProps {
  block: Block
}

const { moveDown, moveUp, removeBlock } = writeLessonSlice.actions

function Controls({ block }: ControlsProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex gap:2x">
      <code className="">{block.position}</code>

      <button
        type="button"
        className={iconBtn({ size: 8 })}
        onClick={() => dispatch(moveDown(block.id))}
      >
        <CaretDownIcon />
      </button>

      <button
        type="button"
        className={iconBtn({ size: 8 })}
        onClick={() => dispatch(moveUp(block.id))}
      >
        <CaretUpIcon />
      </button>

      <button
        type="button"
        className={iconBtn({ size: 8 })}
        onClick={() => dispatch(removeBlock(block.id))}
      >
        <TrashIcon />
      </button>
    </div>
  )
}
