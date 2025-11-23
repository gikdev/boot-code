import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getApiV1LessonsByIdOptions } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackBtn } from "#/components/go-back-btn"
import { Spinner } from "#/components/spinner"
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
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useEffect(() => {
    if (!data) return

    const result = WriteLessonStateSchema.safeParse(data.contentJson)

    if (result.success) {
      dispatch(decode(result.data))
    } else {
      toast.warning("محتوا قابل بازیابی نبود یا نسخه جدید است...")
    }
  }, [data, dispatch])

  return (
    <div className={phonePage()}>
      <AppBar title="نوشتن" slotStart={<GoBackBtn onClick={goBack} />} />

      <div className={main()}>
        {status === "error" && <ErrorParagraph onClick={refetch} />}
        {status === "pending" && <Spinner />}
        {status === "success" && <LessonContent {...data} />}

        <FabMenuWrapper lessonId={lessonId} goBack={goBack} />
      </div>
    </div>
  )
}
