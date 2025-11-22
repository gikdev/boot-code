/** biome-ignore-all lint/suspicious/noArrayIndexKey: Not needed. */
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { AssetRenderer } from "#/components/asset-renderer"
import { btn } from "#/lib/skins"
import { type Block, BlockTypes } from "./blocks"

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
      return <hr />

    case BlockTypes.Checklist:
      return (
        <div>
          {block.items.map((item, i) => (
            <label key={i}>
              <input type="checkbox" checked={item.checked} />
              <Markdown>{item.label}</Markdown>
            </label>
          ))}
        </div>
      )

    case BlockTypes.SimpleTable: {
      const [headers = [], ...bodyRows] = block.rows

      return (
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bodyRows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }

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
        <SyntaxHighlighter language={block.language} style={vscDarkPlus}>
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

    case BlockTypes.SimpleList:
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Markdown>{item}</Markdown>
            </li>
          ))}
        </ul>
      )

    case BlockTypes.Heading:
      return <p className={`font:${block.level}xl`}>{block.content}</p>

    default:
      return null
  }
}
