import {
  BookOpenTextIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import type { ModuleRes } from "#/api/generated/client"
import { Skeleton } from "./ui/skeleton"

interface ModuleCardsListProps {
  modules: ModuleRes[]
}

export const ModuleCard = {
  Core: ({ title, description, id, courseId }: ModuleRes) => (
    <Link
      to="/courses/$courseId/modules/$moduleId"
      params={{ courseId, moduleId: id }}
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

      {description && <p>{description}</p>}
    </Link>
  ),

  Skeleton: () => (
    <div className="flex gap:2x items-start animate-pulse p:4x b:1|solid|grey-10 r:2x @fade|1s|infinite|alternate">
      <Skeleton className="r:1.5x size:6x" />
      <Skeleton className="r:1.5x h:6x w:24x ml:auto" />
      <Skeleton className="r:1.5x size:6x" />
    </div>
  ),

  List: ({ modules }: ModuleCardsListProps) =>
    modules.map(m => <ModuleCard.Core key={m.id} {...m} />),

  ListSkeleton: () => (
    <>
      <ModuleCard.Skeleton />
      <ModuleCard.Skeleton />
      <ModuleCard.Skeleton />
    </>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p:4x gap:2x">
      <BookOpenTextIcon size={24} />
      <p>فعلا فصلی نداریم.</p>
    </div>
  ),
}
