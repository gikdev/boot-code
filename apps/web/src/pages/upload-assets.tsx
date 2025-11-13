import { UploadIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import z from "zod"
import { postApiV1AssetsMutation } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { useAppForm } from "#/forms"
import { extractErrorMessage } from "#/lib/errors"
import { btn, main, phonePage } from "#/lib/skins"

export const UploadAssetsPage = () => (
  <div className={phonePage()}>
    <AppBar
      title="آپلود فایل"
      slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/assets" })} />}
    />

    <div className={main()}>
      <UploadAssetForm />
    </div>
  </div>
)

const UploadFormSchema = z.object({
  description: z.string(),
  file: z.instanceof(File).nullable(),
})
type UploadFormValues = z.infer<typeof UploadFormSchema>

const defaultValues: UploadFormValues = {
  description: "",
  file: null,
}

function UploadAssetForm() {
  const assetMut = useMutation({
    ...postApiV1AssetsMutation(),
    onError: error => toast.error(extractErrorMessage({ error })),
    onSuccess: () => {
      toast.success("با موفقیت انجام شد.")
      form.reset()
    },
  })

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: UploadFormSchema,
    },
    onSubmit({ value }) {
      if (!value.file) {
        toast.warn("فایل نباید خالی باشد.")
        return
      }

      assetMut.mutate({
        body: {
          Description: value.description.trim() || undefined,
          File: value.file,
        },
      })
    },
  })

  return (
    <div className="flex flex-col gap:4x">
      <form.AppField name="description">
        {field => <field.SimpleTextField label="توضیح" />}
      </form.AppField>

      <form.AppField name="file">
        {field => <field.SimpleFileField label="فایل" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          className={btn({
            className: "w:full",
            theme: "contained-primary",
          })}
        >
          <UploadIcon />
          <span>آپلود</span>
        </form.Btn>
      </form.AppForm>
    </div>
  )
}
