import { useQuery } from "@tanstack/react-query"
import {
  getApiV1LessonsByIdOptions,
  type LessonFullRes,
} from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackBtn } from "#/components/go-back-btn"
import { Spinner } from "#/components/spinner"
import { main, phonePage } from "#/lib/skins"
import { FabMenuWrapper } from "./fab"
import type { WriteLessonPageProps } from "./types"

export function WriteLessonPage({ lessonId, goBack }: WriteLessonPageProps) {
  const { data, status, refetch } = useQuery(
    getApiV1LessonsByIdOptions({ path: { id: lessonId } }),
  )

  return (
    <div className={phonePage()}>
      <AppBar title="نوشتن" slotStart={<GoBackBtn onClick={goBack} />} />

      <div className={main()}>
        {status === "error" && <ErrorParagraph onClick={refetch} />}
        {status === "pending" && <Spinner />}
        {status === "success" && <LessonDetails {...data} />}

        <FabMenuWrapper lessonId={lessonId} goBack={goBack} />
      </div>
    </div>
  )
}

function LessonDetails({ contentJson }: LessonFullRes) {
  return (
    <div className="flex flex-col gap:2x">
      <p className="font:bold font:3xl fg:grey-90">{contentJson}</p>
    </div>
  )
}
