import type { LessonFullRes } from "#/api/generated/client"
import { BlockRenderer } from "#/features/blocks/components/block-renderer"
import { NewBlock } from "#/features/blocks/components/new-block"
import { useAppSelector } from "#/store"

export function LessonContent({ title }: LessonFullRes) {
  const blocks = useAppSelector(s => s.writeLesson.blocks)

  return (
    <div className="flex flex-col gap:2x">
      <p className="font:bold font:3xl fg:grey-90 text:center">{title}</p>

      {blocks.map(block => (
        <BlockRenderer key={block.id} block={block} isEditMode />
      ))}

      <NewBlock />
    </div>
  )
}
