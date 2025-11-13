import { PlusIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useEffectEvent } from "react"
import { toast } from "react-toastify"
import z from "zod"
import {
  type CourseReq,
  getApiV1AssetsOptions,
  getApiV1CoursesById,
  postApiV1CoursesMutation,
  putApiV1CoursesByIdMutation,
} from "#/api/generated/client"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn } from "#/lib/skins"

const courseFormSchema = z.object({
  title: z.string().min(1, "عنوان اجباری هست.").trim(),
  description: z.string(),
  thumbnailId: z
    .number({ message: "آی‌دی تامبنیل باید عدد مثبت باشد." })
    .positive("آی‌دی تامبنیل باید عدد مثبت باشد."),
})
type CourseFormValues = z.infer<typeof courseFormSchema>

const emptyValues: CourseFormValues = {
  title: "",
  description: "",
  thumbnailId: 0,
}

type CourseFormProps =
  | {
      mode: "create"
      onSuccess?: () => void
    }
  | {
      mode: "edit"
      onSuccess?: () => void
      id: number
    }

const onError = (error: unknown) => toast.error(extractErrorMessage({ error }))

export function CourseForm(props: CourseFormProps) {
  const assetsRes = useQuery(getApiV1AssetsOptions())
  const { mutate: createCourse } = useMutation(postApiV1CoursesMutation())
  const { mutate: editCourse } = useMutation(putApiV1CoursesByIdMutation())

  const form = useAppForm({
    defaultValues: emptyValues,
    validators: {
      onChange: courseFormSchema,
    },
    onSubmit({ value }) {
      const onSuccess = () => {
        props.onSuccess?.()
        form.reset(emptyValues)
        toast.success("با موفقیت انجام شد.")
      }

      const body: CourseReq = {
        title: value.title,
        description: value.description.trim() || null,
        thumbnailId: value.thumbnailId,
      }

      if (props.mode === "create") {
        createCourse({ body }, { onSuccess, onError })
      }

      if (props.mode === "edit") {
        const path = { id: props.id }
        editCourse({ body, path }, { onSuccess, onError })
      }
    },
  })

  const getDefaultValues = useEffectEvent(() => {
    if (props.mode !== "edit") return

    getApiV1CoursesById({ path: { id: props.id } })
      .then(res => {
        if (!res.data) return

        form.reset({
          description: res.data.description || "",
          thumbnailId: res.data.thumbnail.id,
          title: res.data.title,
        })
      })
      .catch(onError)
  })

  useEffect(() => {
    if (props.mode !== "edit") return

    getDefaultValues()
  }, [props.mode])

  return (
    <div className="flex flex-col gap:4x">
      <form.AppField name="title">
        {field => <field.SimpleTextField label="عنوان" />}
      </form.AppField>

      <form.AppField name="description">
        {field => <field.SimpleTextField label="توضیح" isMultiline />}
      </form.AppField>

      <form.AppField name="thumbnailId">
        {field => (
          <div className="flex flex-col gap:1x">
            <p>تامبنیل</p>
            {assetsRes.isSuccess ? (
              <ul>
                {assetsRes.data.items.map(i => (
                  <label key={i.id} className="w:full flex gap:1x items-center">
                    <input
                      type="radio"
                      name="thumbnail"
                      value={i.id}
                      checked={i.id === field.state.value}
                      onChange={() => field.handleChange(i.id)}
                    />
                    <span>
                      {i.description || "---"} #{i.id}
                    </span>
                  </label>
                ))}
              </ul>
            ) : (
              <p>در حال بارگذاری...</p>
            )}
          </div>
        )}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          className={btn({
            className: "w:full",
            theme: "contained-primary",
          })}
        >
          <PlusIcon />
          <span>ایجاد</span>
        </form.Btn>
      </form.AppForm>
    </div>
  )
}
