/** biome-ignore-all lint/suspicious/noArrayIndexKey: Not needed. */
import { BlockTypes } from "../../types"
import { BlockAudio } from "./block-audio"
import type { BlockTypeBaseProps } from "./block-base"
import { BlockCode } from "./block-code"
import { BlockFileDownload } from "./block-file-download"
import { BlockHeading } from "./block-heading"
import { BlockImage } from "./block-image"
import { BlockLinkBtn } from "./block-link-btn"
import { BlockQuote } from "./block-quote"
import { BlockSeparator } from "./block-separator"
import { BlockText } from "./block-text"
import { BlockVideo } from "./block-video"

interface BlockRendererProps extends BlockTypeBaseProps {}

export function BlockRenderer({
  block,
  isEditMode = false,
}: BlockRendererProps) {
  switch (block.type) {
    case BlockTypes.Text:
      return <BlockText block={block} isEditMode={isEditMode} />

    case BlockTypes.Image:
      return <BlockImage block={block} isEditMode={isEditMode} />

    case BlockTypes.Audio:
      return <BlockAudio block={block} isEditMode={isEditMode} />

    case BlockTypes.Video:
      return <BlockVideo block={block} isEditMode={isEditMode} />

    case BlockTypes.Separator:
      return <BlockSeparator block={block} isEditMode={isEditMode} />

    case BlockTypes.LinkButton:
      return <BlockLinkBtn block={block} isEditMode={isEditMode} />

    case BlockTypes.Code:
      return <BlockCode block={block} isEditMode={isEditMode} />

    case BlockTypes.Quote:
      return <BlockQuote block={block} isEditMode={isEditMode} />

    case BlockTypes.Heading:
      return <BlockHeading block={block} isEditMode={isEditMode} />

    case BlockTypes.FileDownload:
      return <BlockFileDownload block={block} isEditMode={isEditMode} />

    default:
      return null
  }
}
