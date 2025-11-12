import { tv } from "tailwind-variants/lite"

export const phonePage = tv({
  base: `
    flex flex-col mx:auto
    max-w:120x w:full h:100dvh
    bg:grey-1 
  `,
})

export const main = tv({
  base: `
    p:4x flex:1
    flex flex-col gap:4x
    overflow-y:auto
  `,
})

export const iconBtn = tv({
  base: `
    flex flex-col items-center justify-center r:1.5x
    cursor:pointer cursor:not-allowed[disabled]
    fg:grey-60 fg:grey-90:hover fg:grey-60:hover[disabled]
    bg:transparent bg:grey-10:hover bg:transparent:hover[disabled]
    transform:scale(.95):active transform:scale(1):active[disabled]
    opacity:0.5[disabled]
  `,
  variants: {
    size: {
      8: `size:8x font:xs font:1.5em_svg`,
      12: `size:12x font:md font:1.5em_svg`,
    },
  },
  defaultVariants: {
    size: 12,
  },
})

export const linkBtn = tv({
  base: `
    text:underline 
    fg:grey-60 fg:grey-90:hover fg:grey-60:hover[disabled]
    cursor:pointer cursor:not-allowed[disabled]
  `,
})

export const btn = tv({
  base: `
    flex items-center justify-center
    font:1.3em_svg

    opacity:0.5[disabled]
    filter:greyscale(1)[disabled]

    transform:scale(0.95):active transform:scale(1):active[disabled]
    cursor:pointer  cursor:not-allowed[disabled]
  `,
  variants: {
    size: {
      md: `min-h:12x gap:2x px:4x r:1.5x`,
    },
    theme: {
      "contained-primary": `
        bg:indigo-60
        bg:indigo-70:hover
        bg:indigo-60:hover[disabled]

        fg:grey-0
      `,
      "light-neutral": `
        bg:grey-10
        bg:grey-20:hover
        bg:grey-10:hover[disabled]

        fg:grey-60
        fg:grey-90:hover
        fg:grey-60:hover[disabled]
      `,
    },
  },
  defaultVariants: {
    size: "md",
    theme: "light-neutral",
  },
})
