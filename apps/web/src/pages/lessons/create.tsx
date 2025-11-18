import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { LessonForm } from "./form"

interface PageProps {
  moduleId: number
  goBackHref: string
}

export const CreateLessonPage = ({ moduleId, goBackHref }: PageProps) => (
  <div className={phonePage()}>
    <AppBar
      title="درس جدید"
      slotStart={<GoBackNavBtn onClick={nav => nav({ to: goBackHref })} />}
    />

    <div className={main()}>
      <LessonForm mode="create" moduleId={moduleId} />
    </div>
  </div>
)
