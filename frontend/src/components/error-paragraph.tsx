import { WarningIcon } from "@phosphor-icons/react"
import { linkBtn } from "#/lib/skins"

interface ErrorParagraphProps {
  onClick: () => void
}

export function ErrorParagraph({ onClick }: ErrorParagraphProps) {
  return (
    <p className="flex items-center justify-center gap:1x fg:red-60">
      <WarningIcon className="inline mb-1" />
      <span>یه مشکلی پیش اومد. </span>
      <button type="button" className={linkBtn()} onClick={onClick}>
        سعی دوباره
      </button>
    </p>
  )
}
