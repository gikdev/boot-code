import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { main, phonePage } from "#/lib/skins"
import { CourseForm } from "./form"

export const CreateCoursePage = () => (
  <div className={phonePage()}>
    <AppBar
      title="دوره جدید"
      slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/courses" })} />}
    />

    <div className={main()}>
      <CourseForm mode="create" />
    </div>
  </div>
)
