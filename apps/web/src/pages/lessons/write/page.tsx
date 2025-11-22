import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "react-toastify"
import {
  getApiV1LessonsByIdOptions,
  type LessonFullRes,
} from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackBtn } from "#/components/go-back-btn"
import { Spinner } from "#/components/spinner"
import { main, phonePage } from "#/lib/skins"
import { useAppDispatch, useAppSelector } from "#/store"
import { BlockControl } from "./block-control"
import { FabMenuWrapper } from "./fab"
import { NewBlock } from "./new-block"
import { WriteLessonStateSchema, writeLessonSlice } from "./slice"
import type { WriteLessonPageProps } from "./types"

const { decode } = writeLessonSlice.actions

export function WriteLessonPage({ lessonId, goBack }: WriteLessonPageProps) {
  const dispatch = useAppDispatch()
  const { data, status, refetch } = useQuery(
    getApiV1LessonsByIdOptions({ path: { id: lessonId } }),
  )

  useEffect(() => {
    if (!data) return

    const result = WriteLessonStateSchema.safeParse(data.contentJson)

    if (result.success) {
      dispatch(decode(result.data))
    } else {
      toast.warning("محتوا قابل بازیابی نبود...")
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

function LessonContent({ title }: LessonFullRes) {
  const blocks = useAppSelector(s => s.writeLesson.blocks)

  return (
    <div className="flex flex-col gap:2x">
      <p className="font:bold font:3xl fg:grey-90 text:center">{title}</p>

      {blocks.map(block => (
        <BlockControl key={block.id} block={block} />
      ))}

      <NewBlock />
    </div>
  )
}
