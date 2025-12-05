import { CaretLeftIcon } from "@phosphor-icons/react"
import { useRouter } from "@tanstack/react-router"
import { IconBtn } from "./ui/button"

export function GoBackInHistoryBtn() {
  const router = useRouter()

  return (
    <IconBtn onClick={() => router.history.back()}>
      <CaretLeftIcon mirrored />
    </IconBtn>
  )
}
