import {
  BookOpenTextIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import type { ModuleRes } from "#/api/generated/client"

interface LessonCardProps {
  id: number
  title: string
}

interface LessonCardsListProps {
  lessons: ModuleRes[]
}

export const LessonCard = {
  Core: ({ id, title }: LessonCardProps) => (
    <Link to="/lessons/$id" params={{ id }}>
      <div className="flex flex-col gap:2x p:4x bg:grey-10 b:1|solid|grey-30 r:2x cursor:pointer">
        <div className="flex gap:2x items-start">
          <SquaresFourIcon size={24} className="flex-shrink:0 flex-grow:0" />
          <p className="flex-1">{title}</p>
          <CaretRightIcon
            size={24}
            className="flex-shrink:0 flex-grow:0"
            mirrored
          />
        </div>
      </div>
    </Link>
  ),

  Skeleton: () => (
    <div className="flex gap:2x items-start animate-pulse p:4x bg-gray-50 border border-gray-300 rounded-lg">
      <div className="r:1.5x bg:grey-30 size:6x" />
      <div className="r:1.5x bg:grey-30 h:6x w:24x mr:auto:dir(ltr) ml:auto:dir(rtl)" />
      <div className="r:1.5x bg:grey-30 size:6x" />
    </div>
  ),

  List: ({ lessons }: LessonCardsListProps) => (
    <>
      {lessons.map(l => (
        <LessonCard.Core key={l.id} id={l.id} title={l.title} />
      ))}
    </>
  ),

  ListSkeleton: () => (
    <>
      <LessonCard.Skeleton />
      <LessonCard.Skeleton />
      <LessonCard.Skeleton />
    </>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p:4x gap:2x">
      <BookOpenTextIcon size={24} />
      <p>فعلا درسی نداریم.</p>
    </div>
  ),
}
