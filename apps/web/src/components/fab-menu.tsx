import { type Icon, ListIcon, XIcon } from "@phosphor-icons/react"
import { cn, tv, type VariantProps } from "tailwind-variants/lite"

const fabBtnItem = tv({
  base: "cursor:pointer transform:scale(.95):active",
  variants: {
    theme: {
      "secondary-brand":
        "bg:indigo-20 bg:indigo-30:hover fg:indigo-60 fg:indigo-90:hover",
      "secondary-danger": "bg:red-20 bg:red-30:hover fg:red-60 fg:red-90:hover",
      "secondary-neutral":
        "bg:grey-20 bg:grey-30:hover fg:grey-60 fg:grey-90:hover",
      "secondary-success":
        "bg:beryl-20 bg:beryl-30:hover fg:beryl-60 fg:beryl-90:hover",
    },
    size: {
      md: "px:6x py:1x gap:1x items-center flex min-h:14x font-1.3em_svg r:2x",
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
  isOpen?: boolean
  className?: string
  onClick?: () => void
}

export function FabMenu({
  items,
  isOpen = false,
  className,
  onClick,
}: FabMenuProps) {
  return (
    <div
      className={cn(
        "abs bottom:4x left:4x flex flex-col gap:2x items-end",
        className,
      )}
    >
      {isOpen && (
        <div className="flex flex-col gap:1x items-end">
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
