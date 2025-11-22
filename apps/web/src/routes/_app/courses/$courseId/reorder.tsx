import { createFileRoute, Navigate } from "@tanstack/react-router"
import {
  getApiV1CoursesById,
  type PositionReq,
  patchApiV1ModulesPositions,
} from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { useNavigateTo } from "#/lib/hooks"
import { strToNullableNum } from "#/lib/utils"
import { ReorderItemsPage } from "#/pages/reorder/page"

export const Route = createFileRoute("/_app/courses/$courseId/reorder")({
  component: RouteComponent,
  params: {
    parse: raw => ({
      courseId: strToNullableNum(raw.courseId),
    }),
  },
})

function RouteComponent() {
  const { courseId } = Route.useParams()
  const navBack = useNavigateTo(nav =>
    nav({
      to: "/courses/$courseId",
      params: { courseId },
    }),
  )

  if (typeof courseId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <ReorderItemsPage
        onApplyChanges={onApplyChanges}
        fetchItems={getItemsFetcher(courseId)}
        navBack={navBack}
      />
    </RequireRole>
  )
}

const getItemsFetcher = (id: number) => async () =>
  getApiV1CoursesById({
    path: { id },
    throwOnError: true,
  }).then(res =>
    res.data.modules.map(m => ({
      id: m.id,
      title: m.title,
      position: m.position,
    })),
  )

const onApplyChanges = async (positions: PositionReq[]) =>
  patchApiV1ModulesPositions({ body: { positions } })
