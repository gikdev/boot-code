import {
  ArrowsLeftRightIcon,
  type Icon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react"
import { useState } from "react"
import { cn, tv, type VariantProps } from "tailwind-variants/lite"
import { useAppDispatch, useAppSelector } from "#/store"
import { uiSlice } from "#/store/slices/ui"

const fabBtnItem = tv({
  base: "cursor:pointer transform:scale(.95):active",
  variants: {
    theme: {
      "secondary-brand": "bg:indigo-10 bg:indigo-20:hover fg:indigo-90",
      "secondary-danger": "bg:red-10 bg:red-20:hover fg:red-90",
      "secondary-neutral": "bg:grey-10 bg:grey-20:hover fg:grey-90",
      "secondary-success": "bg:beryl-10 bg:beryl-20:hover fg:beryl-90",
    },
    size: {
      md: "px:6x py:1x gap:1x items-center flex min-h:14x font:1.3em_svg r:2x",
    },
  },
  defaultVariants: {
    theme: "secondary-neutral",
    size: "md",
  },
})

const fabBtn = tv({
  base: "cursor:pointer transform:scale(.95):active",
  variants: {
    theme: {
      "contained-brand": "r:2xl bg:indigo-60 fg:grey-10 bg:indigo-70:hover",
    },
    size: {
      md: "p:4x",
    },
  },
  defaultVariants: {
    size: "md",
    theme: "contained-brand",
  },
})

export interface FabItem {
  key: string
  label: string
  icon?: Icon
  hidden?: boolean
  onClick: () => void
  theme?: VariantProps<typeof fabBtnItem>["theme"]
  closeAfterClick?: boolean
}

interface FabMenuProps {
  items: FabItem[]
  className?: string
}

const { changeFab } = uiSlice.actions

export function FabMenu({ items, className }: FabMenuProps) {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(s => s.ui.fab === "opened")
  const [isPositionSwitched, setPositionSwitched] = useState(false)
  const onClick = () => dispatch(changeFab(isOpen ? "closed" : "opened"))

  return (
    <div
      className={cn(
        "fixed bottom:4x flex flex-col gap:2x items-end z:10",
        isPositionSwitched ? "right:4x items-start" : "left:4x items-end",
        className,
      )()}
    >
      {isOpen && (
        <div className="flex flex-col gap:1x items-end">
          <FabItem
            key="switch"
            label="تعویض جا"
            icon={ArrowsLeftRightIcon}
            closeAfterClick={false}
            onClick={() => setPositionSwitched(p => !p)}
          />

          {items.map(item => (
            <FabItem {...item} key={item.key} onClose={onClick} />
          ))}
        </div>
      )}

      <button type="button" className={fabBtn()} onClick={onClick}>
        {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
      </button>
    </div>
  )
}

type FabItemProps = FabItem & {
  onClose?: () => void
}

function FabItem({
  label,
  onClick,
  hidden = false,
  icon: Icon,
  theme,
  closeAfterClick = false,
  onClose = () => {},
}: FabItemProps) {
  if (hidden) return true

  return (
    <button
      type="button"
      className={fabBtnItem({ theme })}
      onClick={() => {
        onClick()
        if (!closeAfterClick) return
        onClose()
      }}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  )
}
