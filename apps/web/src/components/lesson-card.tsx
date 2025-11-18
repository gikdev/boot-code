import {
  BookOpenTextIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import type { LessonRes } from "#/api/generated/client"
import { Skeleton } from "./ui/skeleton"

interface LessonCardProps extends LessonRes {
  detailsPageLinkOptions: { to: string }
}

interface LessonCardsListProps {
  lessons: LessonCardProps[]
  courseId?: number
}

export const LessonCard = {
  Core: ({ title, description, detailsPageLinkOptions }: LessonCardProps) => (
    <Link
      {...detailsPageLinkOptions}
      className="flex flex-col gap:2x p:4x bg:grey-0 b:1|solid|grey-10 r:2x cursor:pointer"
    >
      <div className="flex gap:2x items-center">
        <SquaresFourIcon size={24} className="flex-shrink:0 flex-grow:0" />

        <p className="flex:1">{title}</p>

        <CaretRightIcon
          size={24}
          className="flex-shrink:0 flex-grow:0"
          mirrored
        />
      </div>

      {description && <p className="font:xs">{description}</p>}
    </Link>
  ),

  Skeleton: () => (
    <div className="flex gap:2x items-start animate-pulse p:4x b:1|solid|grey-10 r:2x @fade|1s|infinite|alternate">
      <Skeleton className="r:1.5x size:6x" />
      <Skeleton className="r:1.5x h:6x w:24x ml:auto" />
      <Skeleton className="r:1.5x size:6x" />
    </div>
  ),

  List: ({ lessons }: LessonCardsListProps) =>
    lessons.map(l => <LessonCard.Core key={l.id} {...l} />),

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
