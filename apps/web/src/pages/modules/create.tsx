import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { ModuleForm } from "./form"

interface CreateModulePageProps {
  courseId: number
}

export const CreateModulePage = ({ courseId }: CreateModulePageProps) => (
  <div className={phonePage()}>
    <AppBar
      title="فصل جدید"
      slotStart={
        <GoBackNavBtn
          onClick={nav =>
            nav({
              to: "/courses/$id",
              params: { id: courseId },
            })
          }
        />
      }
    />

    <div className={main()}>
      <ModuleForm mode="create" courseId={courseId} />
    </div>
  </div>
)
