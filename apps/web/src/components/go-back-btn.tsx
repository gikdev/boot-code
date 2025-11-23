import { CaretLeftIcon } from "@phosphor-icons/react"
import { IconBtn } from "./ui/button"

interface GoBackBtnProps {
  onClick?: () => void
  className?: string
}

export function GoBackBtn({ onClick, className }: GoBackBtnProps) {
  return (
    <IconBtn onClick={onClick} className={className}>
      <CaretLeftIcon mirrored />
    </IconBtn>
  )
}
