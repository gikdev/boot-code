import { CaretLeftIcon } from "@phosphor-icons/react"
import { iconBtn } from "#/lib/skins"

interface GoBackBtnProps {
  onClick?: () => void
  className?: string
}

export function GoBackBtn({ onClick, className }: GoBackBtnProps) {
  return (
    <button type="button" onClick={onClick} className={iconBtn({ className })}>
      <CaretLeftIcon mirrored />
    </button>
  )
}
