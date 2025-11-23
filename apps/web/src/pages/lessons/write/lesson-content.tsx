import type { LessonFullRes } from "#/api/generated/client"
import { useAppSelector } from "#/store"
import { BlockControl } from "../../../features/blocks/components/block-control"
import { NewBlock } from "../../../features/blocks/components/new-block"

export function LessonContent({ title }: LessonFullRes) {
  const blocks = useAppSelector(s => s.writeLesson.blocks)

  return (
    <div className="flex flex-col gap:2x">
      <p className="font:bold font:3xl fg:grey-90 text:center">{title}</p>

      {blocks.map(block => (
        <BlockControl key={block.id} block={block} />
      ))}

      <NewBlock />
    </div>
  )
}
