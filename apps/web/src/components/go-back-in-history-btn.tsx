import { CaretLeftIcon } from "@phosphor-icons/react"
import { useRouter } from "@tanstack/react-router"
import { iconBtn } from "#/lib/skins"

export function GoBackInHistoryBtn() {
  const router = useRouter()

  return (
    <button
      type="button"
      className={iconBtn()}
      onClick={() => router.history.back()}
    >
      <CaretLeftIcon mirrored />
    </button>
  )
}
