import { CircleNotchIcon } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"
import { useFormContext } from ".."

interface BtnProps {
  children?: ReactNode
  className?: string
  isLoading?: boolean
  onClick?: () => void
  btnType?: ComponentProps<"button">["type"]
  disabled?: boolean
}

export function Btn({
  children,
  onClick,
  className,
  btnType = "button",
  isLoading = false,
  disabled = false,
}: BtnProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={s => [s.canSubmit, s.isSubmitting]}>
      {([canSubmit, isSubmitting]) => {
        const defaultClickHandler = () => form.handleSubmit()
        const finalClickHandler = onClick ?? defaultClickHandler
        const shouldBeLoading = isLoading || isSubmitting
        const shouldBeDisabled =
          !canSubmit || isSubmitting || disabled || isLoading

        return (
          <button
            type={btnType}
            onClick={finalClickHandler}
            disabled={shouldBeDisabled}
            className={className}
          >
            {shouldBeLoading ? (
              <CircleNotchIcon
                className="@rotate|1s|infinite|linear"
                size={24}
              />
            ) : (
              children
            )}
          </button>
        )
      }}
    </form.Subscribe>
  )
}
