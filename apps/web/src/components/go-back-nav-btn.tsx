import { CaretLeftIcon } from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import { IconBtn } from "./ui/button"

interface GoBackNavBtnProps {
  onClick?: (nav: ReturnType<typeof useNavigate>) => void
  className?: string
}

export function GoBackNavBtn({ onClick, className }: GoBackNavBtnProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick(navigate)
    } else {
      navigate({ to: ".." })
    }
  }

  return (
    <IconBtn onClick={handleClick} className={className}>
      <CaretLeftIcon mirrored />
    </IconBtn>
  )
}
