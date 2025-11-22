import { createFileRoute, Navigate } from "@tanstack/react-router"
import {
  getApiV1ModulesById,
  patchApiV1Lessons,
  type PositionReq,
} from "#/api/generated/client"
import { RequireRole } from "#/auth/require-role"
import { useNavigateTo } from "#/lib/hooks"
import { strToNullableNum } from "#/lib/utils"
import { ReorderItemsPage } from "#/pages/reorder/page"

export const Route = createFileRoute(
  "/_app/courses/$courseId/modules/$moduleId/reorder",
)({
  component: RouteComponent,
  params: {
    parse: raw => ({
      courseId: strToNullableNum(raw.courseId),
      moduleId: strToNullableNum(raw.moduleId),
    }),
  },
})

function RouteComponent() {
  const { courseId, moduleId } = Route.useParams()
  const navBack = useNavigateTo(nav =>
    nav({
      to: "/courses/$courseId/modules/$moduleId",
      params: { courseId, moduleId },
    }),
  )

  if (typeof courseId !== "number") return <Navigate to="/" />
  if (typeof moduleId !== "number") return <Navigate to="/" />

  return (
    <RequireRole roles={["admin"]} fallback={<p>شما دسترسی ندارید.</p>}>
      <ReorderItemsPage
        onApplyChanges={onApplyChanges}
        fetchItems={getItemsFetcher(moduleId)}
        navBack={navBack}
      />
    </RequireRole>
  )
}

const getItemsFetcher = (id: number) => async () =>
  getApiV1ModulesById({
    path: { id },
    throwOnError: true,
  }).then(res =>
    res.data.lessons.map(l => ({
      id: l.id,
      title: l.title,
      position: l.position,
    })),
  )

const onApplyChanges = async (positions: PositionReq[]) =>
  patchApiV1Lessons({ body: { positions } })
