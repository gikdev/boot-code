import {
  BookOpenTextIcon,
  CaretDownIcon,
  CaretUpIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Skeleton } from "#/components/ui/skeleton"
import { iconBtn } from "#/lib/skins"

export interface PositionItem {
  id: number
  title: string
  position: number
}

interface CardProps extends PositionItem {
  onUpBtnClick: (id: number) => void
  onDownBtnClick: (id: number) => void
}

export function PositionedCard({
  position,
  title,
  id,
  onDownBtnClick,
  onUpBtnClick,
}: CardProps) {
  return (
    <div className="flex gap:2x p:2x bg:grey-0 b:1|solid|grey-10 r:2x items-center">
      <SquaresFourIcon size={24} className="flex-shrink:0 flex-grow:0" />

      <p className="flex:1">{title}</p>

      <button
        type="button"
        className={iconBtn({ size: 8 })}
        onClick={() => onDownBtnClick(id)}
      >
        <CaretDownIcon />
      </button>

      <code>{position}</code>

      <button
        type="button"
        className={iconBtn({ size: 8 })}
        onClick={() => onUpBtnClick(id)}
      >
        <CaretUpIcon />
      </button>
    </div>
  )
}

export const PositionedCardSkeleton = () => (
  <div className="flex gap:2x items-start animate-pulse p:2x b:1|solid|grey-10 r:2x @fade|1s|infinite|alternate">
    <Skeleton className="r:1.5x h:6x w:24x flex:1" />
  </div>
)

export const PositionedCardEmpty = () => (
  <div className="flex flex-col items-center justify-center p:4x gap:2x">
    <BookOpenTextIcon size={24} />
    <p>فعلا چیزی نداریم.</p>
  </div>
)
