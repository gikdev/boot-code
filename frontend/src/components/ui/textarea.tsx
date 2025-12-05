import type { ComponentProps } from "react"
import { tv } from "tailwind-variants/lite"

export const textareaVariants = tv({
  base: `
    b:2|solid|grey-10 flex {field-sizing:content} min-h:16x
    w:full r:1.5x bg:transparent px:3x py:2x font:md font:sm@md
    outline:none outline:2|solid|indigo-50:focus-visible
    cursor:not-allowed[disabled] opacity:0.5[disabled]
    resize:vertical
  `,
})

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      dir="auto"
      className={textareaVariants({ className })}
      {...props}
    />
  )
}
