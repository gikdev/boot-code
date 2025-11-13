import { BookOpenTextIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { tv } from "tailwind-variants/lite"
import type { CourseRes } from "#/api/generated/client"
import { Skeleton } from "./ui/skeleton"

const container = tv({
  base: `grid grid-cols:1 grid-cols:2@4xs gap:2x items-stretch`,
})

interface CourseCardsListProps {
  courses: CourseRes[]
}

export const CourseCard = {
  Core: ({ title, thumbnail, description, id }: CourseRes) => (
    <Link
      to="/courses/$id"
      params={{ id }}
      className="flex flex-col h:full gap:0x p:0x bg:grey-0 b:1|solid|grey-10 r:2x"
    >
      <img
        className="video rt:2x rb:0 obj:cover"
        src={`/api/v1/assets/${thumbnail.id}/file`}
        alt=""
      />

      <div className="p:2x flex flex-col gap:2x flex:1">
        <p className="fg:grey-90">{title}</p>

        {description && <p className="font:xs">{description}</p>}
      </div>
    </Link>
  ),

  Skeleton: () => (
    <div className="flex flex-col h:full gap:0x p:0x b:1|solid|grey-10 r:2x">
      <Skeleton className="video w:full rt:2x rb:0" />

      <div className="p:2x flex flex-col gap:1x flex:1">
        <Skeleton className="h:4x" />

        <Skeleton className="h:8x" />
      </div>
    </div>
  ),

  List: ({ courses }: CourseCardsListProps) => (
    <div className={container()}>
      {courses.map(c => (
        <CourseCard.Core key={c.id} {...c} />
      ))}
    </div>
  ),

  ListSkeleton: () => (
    <div className={container()}>
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
    </div>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p:4x gap:2x">
      <BookOpenTextIcon size={24} />
      <p>فعلا دوره‌ای نداریم.</p>
    </div>
  ),
}
