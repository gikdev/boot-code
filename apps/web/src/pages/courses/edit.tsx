import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { CourseForm } from "./form"

export function EditCoursePage({ id }: { id: number }) {
  return (
    <div className={phonePage()}>
      <AppBar
        title="ویرایش دوره"
        slotStart={
          <GoBackNavBtn
            onClick={nav => nav({ to: "/courses/$id", params: { id } })}
          />
        }
      />

      <div className={main()}>
        <CourseForm mode="edit" id={id} />
      </div>
    </div>
  )
}
