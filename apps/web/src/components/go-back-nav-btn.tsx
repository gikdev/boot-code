import { CaretLeftIcon } from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import { iconBtn } from "#/lib/skins"

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
    <button
      type="button"
      onClick={handleClick}
      className={iconBtn({ className })}
    >
      <CaretLeftIcon mirrored />
    </button>
  )
}
