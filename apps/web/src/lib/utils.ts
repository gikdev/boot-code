import type { MouseEvent } from "react"
import { toast } from "react-toastify"
import { extractErrorMessage } from "./errors"

export function copyContentToClipboard(e: MouseEvent<HTMLElement>) {
  const text = e.currentTarget.textContent?.trim()
  if (!text) return

  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("کپی شد."))
    .catch(error => toast.error(extractErrorMessage({ error })))
}
