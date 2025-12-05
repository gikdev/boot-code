import type { ComponentType } from "react"

export const ThreeTimesOf = ({ Thing }: { Thing: ComponentType }) => (
  <>
    <Thing />
    <Thing />
    <Thing />
  </>
)
