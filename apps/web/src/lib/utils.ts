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

type PositionElements = Array<{ position: number }>

export const sortByPosition = <T extends PositionElements>(items: T) =>
  [...items].sort((a, b) => a.position - b.position)

export const strToNullableNum = (str: string) =>
  Number.isNaN(Number(str)) ? null : Number(str)

export const onError = (error: unknown) =>
  toast.error(extractErrorMessage({ error }))
