import type { ReactNode } from "react"
import { Skeleton } from "#/components/ui/skeleton"

interface AppBarCoreProps {
  title: string
  slotStart?: ReactNode
  slotEnd?: ReactNode
  isLoading?: boolean
}

export const AppBar = ({
  title,
  slotStart,
  slotEnd,
  isLoading = false,
}: AppBarCoreProps) => (
  <div className="py:2x px:1x gap:1x h:16x b:1|solid|grey-30 justify-center items-center flex">
    <div className="size:12x">{slotStart}</div>

    {isLoading ? (
      <Skeleton className="h:6x w:24x mx:auto" />
    ) : (
      <p className="mx:auto text:center font:grey-90">{title}</p>
    )}

    <div className="size:12x">{slotEnd}</div>
  </div>
)
