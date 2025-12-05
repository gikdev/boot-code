import type { ReactNode } from "react"
import { useAppSelector } from "#/store"
import type { Role } from "."

interface RequireRoleProps {
  roles: Role[]
  children: ReactNode
  fallback?: ReactNode
}

export function RequireRole({
  roles,
  children,
  fallback = null,
}: RequireRoleProps) {
  const role = useAppSelector(s => s.auth.role)

  const isAllowed = roles.includes(role)

  return isAllowed ? children : fallback
}
