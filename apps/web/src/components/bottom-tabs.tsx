import type { Icon } from "@phosphor-icons/react"
import {
  BookOpenTextIcon,
  ChatsIcon,
  HouseIcon,
  MapTrifoldIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import { Link, linkOptions, useLocation } from "@tanstack/react-router"

interface TabItem {
  id: number
  Icon: Icon
  title: string
  to: string
  disabled?: boolean
}

const DEFAULT_TAB_ITEMS: TabItem[] = [
  {
    id: 0,
    Icon: HouseIcon,
    title: "خانه",
    to: linkOptions({ to: "/" }).to,
  },
  {
    id: 1,
    Icon: BookOpenTextIcon,
    title: "دوره‌ها",
    to: linkOptions({ to: "/" }).to,
  },
  {
    id: 2,
    Icon: MapTrifoldIcon,
    title: "مسیر",
    to: linkOptions({ to: "/" }).to,
  },
  {
    id: 3,
    Icon: ChatsIcon,
    title: "چت",
    to: linkOptions({ to: "/" }).to,
    disabled: true,
  },
  {
    id: 4,
    Icon: UserCircleIcon,
    title: "پروفایل",
    to: linkOptions({ to: "/" }).to,
    disabled: true,
  },
]

interface BottomTabsProps {
  tabItems?: TabItem[]
}

export function BottomTabs({ tabItems = DEFAULT_TAB_ITEMS }: BottomTabsProps) {
  const { pathname } = useLocation()

  return (
    <div className="h:16x bg:grey-10 bt:1|solid|grey-30 w:full grid grid-template-cols:repeat(auto-fit,minmax(0,1fr))">
      {tabItems.map(t => (
        <BottomTab
          Icon={t.Icon}
          id={t.id}
          key={t.id}
          isActive={pathname === t.to}
          title={t.title}
          to={t.to}
          disabled={t.disabled}
        />
      ))}
    </div>
  )
}

interface BottomTabProps extends TabItem {
  isActive: boolean
}

function BottomTab({
  Icon,
  id,
  isActive,
  title,
  to,
  disabled,
}: BottomTabProps) {
  if (disabled)
    return (
      <button
        type="button"
        className="cursor:not-allowed flex flex-col gap:0.5x p:2x items-center text:xs opacity:0.5"
      >
        <Icon size={24} />
        <span>{title}</span>
      </button>
    )

  if (isActive)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap:1x py:2x px:4x items-center justify-center r:2x bg:indigo-60 fg:grey-10">
          <Icon size={24} weight="fill" />
        </div>
      </div>
    )

  return (
    <Link
      to={to}
      key={id}
      className="flex flex-col gap:0.5x p:2x items-center text:xs cursorPpointer bg:grey-20:hover"
    >
      <Icon size={24} />
      <span>{title}</span>
    </Link>
  )
}
