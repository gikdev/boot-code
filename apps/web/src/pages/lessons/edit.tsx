import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { LessonForm } from "./form"

interface PageProps {
  lessonId: number
  goBackHref: string
}

export function EditLessonPage({ goBackHref, lessonId }: PageProps) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="ویرایش درس"
        slotStart={<GoBackNavBtn onClick={nav => nav({ to: goBackHref })} />}
      />

      <div className={main()}>
        <LessonForm mode="update" id={lessonId} />
      </div>
    </div>
  )
}
