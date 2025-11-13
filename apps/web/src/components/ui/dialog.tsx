import { XIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { tv } from "tailwind-variants/lite"
import { iconBtn } from "#/lib/skins"

const dialog = tv({
  slots: {
    overlay:
      "fixed top:0 left:0 right:0 bottom:0 w:full h:full z:50 bg:black/0.5",
    header: "flex flex-col gap:4x text:start",
    footer: "flex flex-col flex-row@4xs justify-end@4xs gap:2x",
    title: "font:xl leading:1 font:bold fg:grey-90",
    description: "fg:grey-60 font:md",
    container: `
      flex flex-col gap:4x 

      w:calc(100vw-4x) max-w:100x@4xs r:2x p:6x

      bg:grey-0 shadow-lg b:2|solid|grey-10

      z:50 abs top:1/2 left:1/2 transform:translate(-50%,-50%)
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
