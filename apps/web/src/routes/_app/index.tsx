import { createFileRoute } from "@tanstack/react-router"
import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { list, phonePage } from "#/lib/skins"

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={phonePage()}>
      <AppBar title="خانه" />

      <div className={list()}>
        <p>خوش اومدی!</p>
      </div>

      <BottomTabs />
    </div>
  )
}
