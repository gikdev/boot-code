import { tv } from "tailwind-variants"

export const input = tv({
  base: `
    px:4x py:3x
    min-h:12x w:full
    outline:none:focus
    b:2|solid|grey-30 b:indigo-50:focus
    r:2x
  `,
  variants: {
    isMultiline: {
      false: null,
      true: "min-h:24x resize:vertical",
    },
  },
  defaultVariants: {
    isMultiline: false,
  },
})

export const fieldContainer = tv({
  base: `flex flex-col gap:1x`,
})
