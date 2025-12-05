import { FilesIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { linkOptions } from "@tanstack/react-router"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getApiV1LessonsByIdOptions } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackBtn } from "#/components/go-back-btn"
import { Spinner } from "#/components/spinner"
import { buttonVariants } from "#/components/ui/button"
import { main, phonePage } from "#/lib/skins"
import { useAppDispatch } from "#/store"
import {
  WriteLessonStateSchema,
  writeLessonSlice,
} from "../../../features/blocks/slice"
import { FabMenuWrapper } from "./fab"
import { LessonContent } from "./lesson-content"
import type { WriteLessonPageProps } from "./types"

const { decode } = writeLessonSlice.actions

export function WriteLessonPage({ lessonId, goBack }: WriteLessonPageProps) {
  const dispatch = useAppDispatch()
  const { data, status, refetch } = useQuery({
    ...getApiV1LessonsByIdOptions({ path: { id: lessonId } }),
  })

  useEffect(() => {
    if (!data) return

    try {
      const content = WriteLessonStateSchema.parse(
        JSON.parse(data.contentJson || "{}"),
      )
      dispatch(decode(content))
    } catch {
      toast.warning("محتوا قابل بازیابی نبود یا نسخه جدید است...")
    }
  }, [data, dispatch])

  return (
    <div className={phonePage()}>
      <AppBar
        title="نوشتن"
        slotStart={<GoBackBtn onClick={goBack} />}
        slotEnd={
          <a
            target="_blank"
            href={linkOptions({ to: "/assets" }).to}
            className={buttonVariants({ size: "icon-md", variant: "ghost" })}
          >
            <FilesIcon />
          </a>
        }
      />

      <div className={main()}>
        {status === "error" && <ErrorParagraph onClick={refetch} />}
        {status === "pending" && <Spinner />}
        {status === "success" && <LessonContent {...data} />}

        <FabMenuWrapper lessonId={lessonId} goBack={goBack} />
      </div>
    </div>
  )
}
