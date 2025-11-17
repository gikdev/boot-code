import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { LessonForm } from "./form"

interface PageProps {
  lessonId: number
}

export function EditLessonPage({ lessonId }: PageProps) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="ویرایش درس"
        slotStart={
          <GoBackNavBtn
            onClick={nav =>
              nav({
                to: "/lessons/$lessonId",
                params: { lessonId },
              })
            }
          />
        }
      />

      <div className={main()}>
        <LessonForm mode="update" id={lessonId} />
      </div>
    </div>
  )
}
