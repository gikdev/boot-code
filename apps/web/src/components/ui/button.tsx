import type { ComponentProps } from "react"
import { cn, tv, type VariantProps } from "tailwind-variants/lite"

export const buttonVariants = tv({
  base: `
    flex items-center justify-center
    shrink-0 flex-shrink:0_svg

    opacity:0.5[disabled] 
    filter:greyscale(1)[disabled]

    font:1.4em_svg
    outline-none

    transform:scale(0.95):active transform:scale(1):active[disabled]
    cursor:pointer  cursor:not-allowed[disabled]
  `,
  variants: {
    variant: {
      primary:
        "bg:indigo-60 bg:indigo-70:hover bg:indigo-60:hover[disabled] fg:grey-0",
      // destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      // outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary:
        "bg:grey-5 bg:grey-10:hover bg:grey-5:hover[disabled] fg:grey-60 fg:grey-90:hover fg:grey-60:hover[disabled]",
      ghost:
        "bg:transparent bg:grey-5:hover bg:transparent:hover[disabled] fg:grey-60 fg:grey-90:hover fg:grey-60:hover[disabled]",
      // link: "text:indigo-60 underline:offset-4 underline[hover]", // not sure if it would work.
    },
    size: {
      xs: `min-h:8x gap:1x px:2x r:1x font:xs`,
      sm: `min-h:10x gap:1.5x px:3x r:1x font:sm`,
      md: `min-h:12x gap:2x px:4x r:1.5x font:md`,
      lg: `min-h:14x gap:2x px:4x r:2x font:lg`,

      "icon-xs": "size:8x r:1x font:xs",
      "icon-sm": "size:10x r:1x font:sm",
      "icon-md": "size:12x r:1.5x font:md",
      "icon-lg": "size:14x r:2x font:lg",
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
})

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button
    type="button"
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
)

export const IconBtn = ({
  className,
  variant = "ghost",
  size = "icon-md",
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
)
