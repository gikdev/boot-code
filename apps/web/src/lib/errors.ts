import { AxiosError } from "axios"

interface ExtractErrorMessageParams {
  status?: number
  error?: unknown
}

export function extractErrorMessage({
  error,
  status,
}: ExtractErrorMessageParams): string {
  if (typeof error === "string" && error.trim().length > 0) {
    return error
  }

  if (Array.isArray(error)) return error.join(", ")

  if (error instanceof AxiosError) {
    return extractErrorMessage({
      error: error.response?.data,
    })
  }

  if (typeof error === "object" && !!error) {
    if ("detail" in error && typeof error.detail === "string")
      return error.detail
    if ("title" in error && typeof error.title === "string") return error.title
    if ("message" in error && typeof error.message === "string")
      return error.message
    if ("msg" in error && typeof error.msg === "string") return error.msg
    if ("error" in error && typeof error.error === "string") return error.error
    if ("description" in error && typeof error.description === "string")
      return error.description
    if ("errorMessage" in error && typeof error.errorMessage === "string")
      return error.errorMessage
    if ("reason" in error && typeof error.reason === "string")
      return error.reason
  }

  if (typeof status === "number" && !Number.isNaN(status)) {
    switch (status) {
      case 400:
        return "درخواست نامعتبر است." // Bad Request
      case 401:
        return "احراز هویت ناموفق بود. لطفاً وارد شوید." // Unauthorized
      case 402:
        return "پرداخت لازم است." // Payment Required
      case 403:
        return "دسترسی به این فایل محدود شده است." // Forbidden
      case 500:
        return "خطای سرور داخلی. لطفاً بعداً دوباره تلاش کنید." // Internal Server Error
      case 501:
        return "عملیات درخواستی پشتیبانی نمی‌شود." // Not Implemented
      case 503:
        return "سرویس در دسترس نیست. لطفاً بعداً تلاش کنید." // Service Unavailable
      default:
        return `خطایی با کد ${status} رخ داده است.` // Fallback
    }
  }

  return "خطایی رخ داده است."
}
