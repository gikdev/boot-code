import { useState } from "react"
import { Dialog } from "#/components/ui/dialog"
import { input } from "#/forms/skins"
import { btn } from "#/lib/skins"

// const { addText } = writingAreaSlice.actions

export function NewTextDialog({ onClose }: { onClose: () => void }) {
  const [content, setContent] = useState("")
  // const dispatch = useAppDispatch()

  const submit = () => {
    // dispatch(addText(content))
    setContent("")
    onClose()
  }

  return (
    <Dialog
      title="متن جدید"
      onClose={onClose}
      dismissOnCloseBtn={false}
      dismissOnOverlay={false}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className={btn({ theme: "light-neutral" })}
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={submit}
            className={btn({ theme: "contained-primary" })}
          >
            ایجاد
          </button>
        </>
      }
    >
      <textarea
        value={content}
        className={input({ isMultiline: true, className: "min-h-80" })}
        onChange={e => setContent(e.target.value)}
      />
    </Dialog>
  )
}
