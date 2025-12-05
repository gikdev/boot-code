import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { ModuleForm } from "./form"

export function EditModulePage({ id }: { id: number }) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="ویرایش دوره"
        slotStart={
          <GoBackNavBtn
            onClick={nav =>
              nav({
                to: "/courses/$courseId",
                params: { courseId: id },
              })
            }
          />
        }
      />

      <div className={main()}>
        <ModuleForm mode="update" id={id} />
      </div>
    </div>
  )
}
