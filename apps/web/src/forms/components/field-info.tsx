import type { AnyFieldApi } from "@tanstack/react-form"
import { extractErrorMessage } from "#/lib/errors"

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { isValid, isValidating } = field.state.meta
  const showError = !isValid

  const errorMsg = field.state.meta.errors
    .map(error => extractErrorMessage({ error }))
    .join(`، `)

  if (isValidating) return <p className="font:xs">در حال بررسی...</p>

  if (showError) return <p className="font:xs fg:red-80">{errorMsg}</p>

  return <p className="font:xs">صحیح</p>
}
