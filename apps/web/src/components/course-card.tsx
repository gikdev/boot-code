import {
  BookOpenTextIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import type { CourseRes } from "#/api/generated/client"

interface CourseCardProps {
  id: number
  title: string
  description: string | null
}

interface CourseCardsListProps {
  courses: CourseRes[]
}

export const CourseCard = {
  Core: ({ title, id }: CourseCardProps) => (
    <Link to="/courses/$id" params={{ id }}>
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
    <div className="flex gap:2x items-start animate-pulse p-4 bg-gray-50 border border-gray-300 rounded-lg">
      <div className="r:1.5x bg:grey-30 size:6x" />
      <div className="r:1.5x bg:grey-30 h:6x w:24x mr:auto:dir(ltr) ml:auto:dir(rtl)" />
      <div className="r:1.5x bg:grey-30 size:6x" />
    </div>
  ),

  List: ({ courses }: CourseCardsListProps) => (
    <>
      {courses.map(c => (
        <CourseCard.Core
          key={c.id}
          id={c.id}
          title={c.title}
          description={c.description}
        />
      ))}
    </>
  ),

  ListSkeleton: () => (
    <>
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
    </>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p:4x gap:2x">
      <BookOpenTextIcon size={24} />
      <p>فعلا دوره‌ای نداریم.</p>
    </div>
  ),
}
