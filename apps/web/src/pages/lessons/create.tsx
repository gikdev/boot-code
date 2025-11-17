import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { LessonForm } from "./form"

interface PageProps {
  courseId: number
  moduleId: number
}

export const CreateLessonPage = ({ courseId, moduleId }: PageProps) => (
  <div className={phonePage()}>
    <AppBar
      title="درس جدید"
      slotStart={
        <GoBackNavBtn
          onClick={nav =>
            nav({
              to: "/courses/$courseId/modules/$moduleId",
              params: { courseId, moduleId },
            })
          }
        />
      }
    />

    <div className={main()}>
      <LessonForm mode="create" moduleId={moduleId} />
    </div>
  </div>
)
