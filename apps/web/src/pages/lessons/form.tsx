import { FloppyDiskIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useEffectEvent } from "react"
import { toast } from "react-toastify"
import z from "zod"
import {
  getApiV1LessonsById,
  type LessonReq,
  postApiV1ModulesByIdLessonsMutation,
  putApiV1LessonsByIdMutation,
} from "#/api/generated/client"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn } from "#/lib/skins"

const formSchema = z.object({
  title: z.string().min(1, "عنوان اجباری هست.").trim(),
  description: z.string(),
  position: z
    .number({ message: "باید عدد مثبت باشد." })
    .positive("باید عدد مثبت باشد."),
  moduleId: z
    .number({ message: "باید عدد مثبت باشد." })
    .positive("باید عدد مثبت باشد."),
})
type FormValues = z.infer<typeof formSchema>

const emptyValues: FormValues = {
  title: "",
  description: "",
  position: 0,
  moduleId: 0,
}

type CommonProps = {
  onSuccess?: () => void
}

type CreateModeProps = {
  mode: "create"
  moduleId: number
}

type UpdateModeProps = {
  mode: "update"
  id: number
}

type FormProps = CommonProps & (CreateModeProps | UpdateModeProps)

const onError = (error: unknown) => toast.error(extractErrorMessage({ error }))

export function LessonForm(props: FormProps) {
  const { mutate: create } = useMutation(postApiV1ModulesByIdLessonsMutation())
  const { mutate: update } = useMutation(putApiV1LessonsByIdMutation())

  const form = useAppForm({
    defaultValues: emptyValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit({ value }) {
      const onSuccess = () => {
        props.onSuccess?.()
        form.reset(emptyValues)
        toast.success("با موفقیت انجام شد.")
      }

      const body: LessonReq = {
        title: value.title,
        description: value.description.trim() || null,
        moduleId: value.moduleId,
        position: value.position,
      }

      if (props.mode === "create") {
        const path = { id: props.moduleId }
        create({ body, path }, { onSuccess, onError })
      }

      if (props.mode === "update") {
        const path = { id: props.id }
        update({ body, path }, { onSuccess, onError })
      }
    },
  })

  const getDefaultValues = useEffectEvent(() => {
    if (props.mode === "create") {
      form.reset({
        ...emptyValues,
        moduleId: props.moduleId,
      })
    } else {
      getApiV1LessonsById({ path: { id: props.id } })
        .then(res => {
          if (!res.data) return

          form.reset({
            description: res.data.description || "",
            title: res.data.title,
            position: res.data.position,
            moduleId: res.data.moduleId,
          })
        })
        .catch(onError)
    }
  })

  useEffect(() => {
    getDefaultValues()
  }, [])

  return (
    <div className="flex flex-col gap:4x">
      <form.AppField name="title">
        {field => <field.SimpleTextField label="عنوان" />}
      </form.AppField>

      <form.AppField name="description">
        {field => <field.SimpleTextField label="توضیح" isMultiline />}
      </form.AppField>

      <form.AppField name="position">
        {field => <field.SimpleNumberField label="موقعیت" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          className={btn({
            className: "w:full",
            theme: "contained-primary",
          })}
        >
          <FloppyDiskIcon />
          <span>ذخیره</span>
        </form.Btn>
      </form.AppForm>
    </div>
  )
}
