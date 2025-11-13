import { CaretRightIcon, FilesIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { RequireRole } from "#/auth/require-role"
import { AppBar } from "#/components/app-bar"
import { BottomTabs } from "#/components/bottom-tabs"
import { btn, main, phonePage } from "#/lib/skins"

export function HomePage() {
  return (
    <div className={phonePage()}>
      <AppBar title="خانه" />

      <div className={main()}>
        <RequireRole roles={["admin"]} fallback={<p>خوش اومدی!</p>}>
          <p className="font:lg font:bold fg:grey-90">برای ادمین</p>

          <div className="flex flex-col gap:2x">
            <Link to="/assets" className={btn({ className: "justify-start" })}>
              <FilesIcon />
              <span>مدیریت فایل‌ها</span>
              <CaretRightIcon className="mr:auto" mirrored />
            </Link>
          </div>
        </RequireRole>
      </div>

      <BottomTabs />
    </div>
  )
}
