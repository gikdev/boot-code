import { FloppyDiskIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { cn } from "tailwind-variants/lite"
import { z } from "zod"
import {
  type CourseReq,
  type CourseRes,
  postApiV1CoursesMutation,
  putApiV1CoursesByIdMutation,
} from "#/api/generated/client"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn } from "#/lib/skins"

const CourseFormSchema = z.object({
  title: z.string().min(1, "این ورودی اجباری است."),
  description: z.string(),
})
type CourseFormValues = z.infer<typeof CourseFormSchema>

const emptyDefaultValues: CourseFormValues = {
  title: "",
  description: "",
}

type SelectFn = (course: CourseRes) => CourseFormValues
export const select: SelectFn = c => ({
  title: c.title,
  description: c.description || "",
})

type CommonProps = {
  onSuccess?: () => void
}

type EditModeProps = {
  mode: "edit"
  defaultValues: CourseFormValues
  courseId: number
}

type CreateModeProps = {
  mode: "create"
}

type CourseFromProps = CommonProps & (EditModeProps | CreateModeProps)

const onSuccess = () => toast.success("انجام شد...")
const onError = (err: unknown) =>
  toast.error(extractErrorMessage({ error: err }))

const useCreateCourseMutation = () =>
  useMutation({
    ...postApiV1CoursesMutation(),
    onSuccess,
    onError,
  })

const useUpdateCourseMutation = () =>
  useMutation({
    ...putApiV1CoursesByIdMutation(),
    onSuccess,
    onError,
  })

export function CourseForm(p: CourseFromProps) {
  const { mutate: createCourse } = useCreateCourseMutation()
  const { mutate: updateCourse } = useUpdateCourseMutation()

  const form = useAppForm({
    defaultValues: p.mode === "create" ? emptyDefaultValues : p.defaultValues,
    validators: { onChange: CourseFormSchema },
    onSubmit: async ({ value }) => {
      const onSuccess = () => {
        form.reset(emptyDefaultValues)
        p.onSuccess?.()
      }

      const body: CourseReq = {
        title: value.title,
        description: value.description || null,
        // TODO: Handle thumbnails!
        thumbnailId: 1,
      }

      switch (p.mode) {
        case "create":
          createCourse({ body }, { onSuccess })
          return
        case "edit": {
          const path = { id: p.courseId }
          updateCourse({ body, path }, { onSuccess })
          return
        }
        default:
          return
      }
    },
  })

  return (
    <div className={cn("flex flex-col gap:4x")}>
      <form.AppField name="title">
        {f => <f.SimpleTextField label="نام *" />}
      </form.AppField>

      <form.AppField name="description">
        {f => <f.SimpleTextField label="توضیحات" isMultiline />}
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
