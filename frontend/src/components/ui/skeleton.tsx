import type { ComponentProps } from "react"
import { cn } from "tailwind-variants/lite"

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <span
      style={{ background: "#E3E3E3" }}
      className={cn(
        "inline-block @fade|1s|infinite|alternate r:1.5x",
        className,
      )()}
      {...props}
    />
  )
}
