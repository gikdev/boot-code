import {
  CursorTextIcon,
  LinkSimpleIcon,
  PaintRollerIcon,
  TabsIcon,
} from "@phosphor-icons/react"
import { buttonVariants, IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../../slice"
import { BlockTypes } from "../../types"
import { BlockBase, type BlockTypeBaseProps } from "./block-base"

const { updateBlock } = writeLessonSlice.actions

interface BlockLinkBtnProps extends BlockTypeBaseProps {}

export function BlockLinkBtn({ block, isEditMode = false }: BlockLinkBtnProps) {
  const dispatch = useAppDispatch()

  if (block.type !== BlockTypes.LinkButton) return null

  const variant = block.variant === "primary" ? "primary" : "secondary"

  const onLabelChange = () => {
    const label = window.prompt("Enter label:", block.label)
    if (!label) return

    const clone = structuredClone(block)
    clone.label = label

    dispatch(updateBlock(clone))
  }

  const onUrlChange = () => {
    const href = window.prompt("Enter URL:", block.href)
    if (!href) return

    const clone = structuredClone(block)
    clone.href = href

    dispatch(updateBlock(clone))
  }

  const onVariantChange = () => {
    let variant = window.prompt(
      "Theme (primary OR secondary):",
      block.variant,
    ) as "primary" | "secondary" | null

    if (variant == null) return

    variant =
      variant && ["primary", "secondary"].includes(variant)
        ? variant
        : "secondary"

    const clone = structuredClone(block)
    clone.variant = variant

    dispatch(updateBlock(clone))
  }

  const onNewTabChange = () => {
    const clone = structuredClone(block)
    clone.newTab = !block.newTab

    dispatch(updateBlock(clone))
  }

  return (
    <BlockBase
      block={block}
      isEditMode={isEditMode}
      rendered={
        <a
          href={block.href}
          className={buttonVariants({ variant })}
          target={block.newTab ? "_blank" : "_self"}
        >
          {block.label}
        </a>
      }
      controls={
        <>
          <IconBtn size="icon-xs" onClick={onLabelChange}>
            <CursorTextIcon />
          </IconBtn>

          <IconBtn size="icon-xs" onClick={onUrlChange}>
            <LinkSimpleIcon />
          </IconBtn>

          <IconBtn size="icon-xs" onClick={onVariantChange}>
            <PaintRollerIcon />
          </IconBtn>

          <IconBtn
            size="icon-xs"
            onClick={onNewTabChange}
            variant={block.newTab ? "primary" : "ghost"}
          >
            <TabsIcon />
          </IconBtn>
        </>
      }
    />
  )
}
