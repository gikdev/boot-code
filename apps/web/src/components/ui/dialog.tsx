import { XIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { tv } from "tailwind-variants"
import { iconBtn } from "#/lib/skins"

const dialog = tv({
  slots: {
    overlay: "fixed top:0 left:0 right:0 bottom:0 z:50 bg:black/0.5",
    header: "flex flex-col gap:4x text:start",
    footer: "flex flex-col flex-row@sm justify-end@sm gap:2x",
    title: "font:xl leading:1 font:bold font:grey-90",
    description: "font:grey-60 font:md",
    container: `
      -- ARRANGEMENT
      flex flex-col gap:4x 

      -- SIZING
      w:full max-w:calc(100%-2rem) max-w:lg@sm r:2x p:6x 

      -- SKIN
      bg:grey-10 shadow-lg b:2x|solid|grey-30

      -- PLACEMENT
      z:50 fixed top:50% left:50% transform:translateX:50% transform:translateY:-50%
    `,
  },
})

interface DialogContentProps {
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode

  onClose: () => void

  dismissOnOverlay?: boolean
  dismissOnCloseBtn?: boolean
}

export function Dialog({
  children,
  description,
  onClose,
  title,
  footer,
  dismissOnCloseBtn = true,
  dismissOnOverlay = true,
}: DialogContentProps) {
  const styles = dialog()

  return (
    <div>
      <button
        type="button"
        disabled={!dismissOnOverlay}
        onClick={onClose}
        className={styles.overlay()}
      />

      <div className="font:xl" />
      <div className={styles.container()}>
        <div className={styles.header()}>
          <p className={styles.title()}>{title}</p>
          {description && <p className={styles.description()}>{description}</p>}
        </div>

        {children}

        {footer && <div className={styles.footer()}>{footer}</div>}

        {dismissOnCloseBtn && <CloseBtn onClose={onClose} />}
      </div>
    </div>
  )
}

interface CloseBtnProps {
  onClose: () => void
}

const CloseBtn = ({ onClose }: CloseBtnProps) => (
  <button
    type="button"
    className={iconBtn({ className: "abs top:2x left:2x", size: 8 })}
    onClick={onClose}
  >
    <XIcon />
  </button>
)
