/** biome-ignore-all lint/suspicious/noArrayIndexKey: Not needed. */
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { AssetRenderer } from "#/components/asset-renderer"
import { btn } from "#/lib/skins"
import { type Block, BlockTypes } from "../types"

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case BlockTypes.Text:
      return <Markdown>{block.content}</Markdown>

    case BlockTypes.Image:
      return <AssetRenderer idOrName={block.fileGuid} mimeType="image/*" />

    case BlockTypes.Audio:
      return <AssetRenderer idOrName={block.fileGuid} mimeType="audio/*" />

    case BlockTypes.Video:
      return <AssetRenderer idOrName={block.fileGuid} mimeType="video/*" />

    case BlockTypes.Separator:
      return <hr className="b:none h:0.5x w:full bg:grey-50 my:8x" />

    case BlockTypes.LinkButton: {
      const theme =
        block.variant === "primary" ? "contained-primary" : "light-neutral"

      return (
        <a href={block.href} className={btn({ theme })}>
          {block.label}
        </a>
      )
    }

    case BlockTypes.Code:
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={block.language}
          customStyle={{ borderRadius: 8 }}
        >
          {block.content}
        </SyntaxHighlighter>
      )

    case BlockTypes.Quote:
      return (
        <blockquote className="">
          <p>{block.content}</p>

          <footer className="">— {block.source}</footer>
        </blockquote>
      )

    case BlockTypes.Heading:
      return (
        <p
          className={`font:${headingLevelMap[block.level]} font:bold fg:grey-90`}
        >
          {block.content}
        </p>
      )

    default:
      return null
  }
}

const headingLevelMap = {
  "2": "2xl",
  "3": "xl",
  "4": "lg",
}
