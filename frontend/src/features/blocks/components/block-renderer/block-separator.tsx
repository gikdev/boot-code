import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

interface BlockSeparatorProps extends BlockTypeBaseProps {}

export function BlockSeparator({
  block,
  isEditMode = false,
}: BlockSeparatorProps) {
  if (block.type !== BlockTypes.Separator) return null

  return (
    <BlockBase
      block={block}
      isEditMode={isEditMode}
      rendered={<hr className="b:none h:0.5x w:full bg:grey-50 my:4x" />}
      controls={null}
    />
  )
}
