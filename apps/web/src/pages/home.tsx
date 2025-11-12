import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { main, phonePage } from "#/lib/skins"

export function HomePage() {
  return (
    <div className={phonePage()}>
      <AppBar title="خانه" />

      <div className={main()}>
        <p>خوش اومدی!</p>
      </div>

      <BottomTabs />
    </div>
  )
}
