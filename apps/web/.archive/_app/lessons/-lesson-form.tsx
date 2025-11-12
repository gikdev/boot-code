import { FloppyDiskIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { cn } from "tailwind-variants/lite"
import { z } from "zod"
import {
  type LessonRes,
  type ModuleReq,
  postApiV1CoursesByIdModulesMutation,
  putApiV1ModulesByIdMutation,
} from "#/api/generated/client"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn } from "#/lib/skins"

const LessonFormSchema = z.object({
  title: z.string().min(1, "این ورودی اجباری است."),
})
type LessonFormValues = z.infer<typeof LessonFormSchema>

const emptyDefaultValues: LessonFormValues = {
  title: "",
}

type SelectFn = (lesson: LessonRes) => LessonFormValues
export const select: SelectFn = c => ({
  title: c.title,
})

interface CommonProps {
  onSuccess?: () => void
}

interface EditModeProps {
  mode: "edit"
  defaultValues: LessonFormValues
  courseId: number
}

interface CreateModeProps {
  mode: "create"
  courseId: number
}

type LessonFormProps = CommonProps & (EditModeProps | CreateModeProps)

const onSuccess = () => toast.success("انجام شد...")
const onError = (error: unknown) => toast.error(extractErrorMessage({ error }))

const useCreateMutation = () =>
  useMutation({
    ...postApiV1CoursesByIdModulesMutation(),
    onSuccess,
    onError,
  })

const useUpdateMutation = () =>
  useMutation({
    ...putApiV1ModulesByIdMutation(),
    onSuccess,
    onError,
  })

export function LessonForm(p: LessonFormProps) {
  const { mutate: create } = useCreateMutation()
  const { mutate: update } = useUpdateMutation()

  const form = useAppForm({
    defaultValues: p.mode === "create" ? emptyDefaultValues : p.defaultValues,
    validators: { onChange: LessonFormSchema },
    onSubmit: async ({ value }) => {
      const onSuccess = () => {
        form.reset(emptyDefaultValues)
        p.onSuccess?.()
      }

      // TODO: Fix IDs, or everything will blow up...
      const path = { id: p.courseId }
      const body: ModuleReq = {
        title: value.title,
        courseId: p.courseId,
        position: 1,
      }

      switch (p.mode) {
        case "create":
          create({ body, path }, { onSuccess })
          return
        case "edit":
          update({ body, path }, { onSuccess })
          return
        default:
          return
      }
    },
  })

  return (
    <div className={cn("flex flex-col gap-4")}>
      <form.AppField name="title">
        {f => <f.SimpleTextField label="نام *" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn className={btn()}>
          <FloppyDiskIcon />
          <span>ثبت</span>
        </form.Btn>
      </form.AppForm>
    </div>
  )
}
