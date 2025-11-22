import { CheckIcon } from "@phosphor-icons/react"
import { useMemo } from "react"
import { toast } from "react-toastify"
import { patchApiV1LessonsById } from "#/api/generated/client"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { onError } from "#/lib/errors"
import type { WriteLessonPageProps } from "./types"

export function FabMenuWrapper({ lessonId, goBack }: WriteLessonPageProps) {
  const items = useMemo(
    () =>
      [
        {
          key: "apply-changes",
          label: "اعمال تغییرات",
          icon: CheckIcon,
          closeAfterClick: true,
          theme: "secondary-success",
          onClick: () => {
            const shouldContinue = window.confirm("Sure?")
            if (!shouldContinue) return

            patchApiV1LessonsById({
              path: { id: lessonId },
              body: { contentJson: "" },
            })
              .then(() => {
                toast.success("پاک شد.")
                goBack()
              })
              .catch(onError)
          },
        },
      ] satisfies FabItem[],
    [lessonId, goBack],
  )

  return <FabMenu items={items} />
}
