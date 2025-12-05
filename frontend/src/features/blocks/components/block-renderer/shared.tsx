import type { PropsWithChildren } from "react"

export const BlockContainer = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap:2x rel">{children}</div>
)

export const ControlLayerContainer = ({ children }: PropsWithChildren) => (
  <div className="flex gap:2x items-center w:full">{children}</div>
)

export const BlockBtnLayer = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="abs bg:blue-5/0.2 top:0 left:0 right:0 bottom:0 cursor:pointer"
  />
)
