/** biome-ignore-all lint/a11y/useMediaCaption: I don't want to do it for now. */

import { DownloadIcon } from "@phosphor-icons/react"
import { btn } from "#/lib/skins"

interface AssetRendererProps {
  mimeType: string
  idOrName: string | number
  className?: string
}

export function AssetRenderer({
  mimeType,
  idOrName,
  className,
}: AssetRendererProps) {
  const src = `/api/v1/assets/${idOrName}/file`
  const downloadUrl = `${src}?download=true`

  if (mimeType.startsWith("image/")) {
    return <img src={src} alt="" className={className} />
  }

  if (mimeType.startsWith("video/")) {
    return (
      <video controls className={className}>
        <source src={src} />
        <span>مرورگر شما از ویدیو پشیتبانی نمی‌کنه.</span>
      </video>
    )
  }

  if (mimeType.startsWith("audio/")) {
    return (
      <audio controls className={className}>
        <source src={src} type={mimeType} />
        <span>مرورگر شما از صوت پشیتبانی نمی‌کنه.</span>
      </audio>
    )
  }

  // fallback for unsupported types (PDF, Excel, etc.)
  return (
    <div className={className}>
      <a href={downloadUrl} download className={btn()}>
        <DownloadIcon />
        <span>دانلود فایل</span>
      </a>
    </div>
  )
}
