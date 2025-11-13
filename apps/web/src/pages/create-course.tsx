import { PlusIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import z from "zod"
import {
  type CourseReq,
  getApiV1AssetsOptions,
  postApiV1CoursesMutation,
} from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn, main, phonePage } from "#/lib/skins"

export const CreateCoursePage = () => (
  <div className={phonePage()}>
    <AppBar
      title="دوره جدید"
      slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/courses" })} />}
    />

    <div className={main()}>
      <CreateCourseForm />
    </div>
  </div>
)

const CourseFormSchema = z.object({
  title: z.string().min(1, "عنوان اجباری هست.").trim(),
  description: z.string(),
  thumbnailId: z
    .number({ message: "آی‌دی تامبنیل باید عدد مثبت باشد." })
    .positive("آی‌دی تامبنیل باید عدد مثبت باشد."),
})
type CourseFormValues = z.infer<typeof CourseFormSchema>

const defaultValues: CourseFormValues = {
  title: "",
  description: "",
  thumbnailId: 0,
}

function CreateCourseForm() {
  const assetsRes = useQuery(getApiV1AssetsOptions())

  const createMut = useMutation({
    ...postApiV1CoursesMutation(),
    onError: error => toast.error(extractErrorMessage({ error })),
    onSuccess: () => {
      toast.success("با موفقیت انجام شد.")
      form.reset()
    },
  })

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: CourseFormSchema,
    },
    onSubmit({ value }) {
      const body: CourseReq = {
        title: value.title,
        description: value.description.trim() || null,
        thumbnailId: value.thumbnailId,
      }

      createMut.mutate({ body })
    },
  })

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
