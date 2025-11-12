import { createContext, type ReactNode, useCallback, useContext } from "react"

// -----------------
// Actions & Resources
// -----------------
const ACTIONS = ["MANAGE", "READ", "NONE"] as const
type Action = (typeof ACTIONS)[number]

const RESOURCES = ["COURSE", "PIECE", "LESSON"] as const
type Resource = (typeof RESOURCES)[number]

// -----------------
// Simple Role-Permission Map
// -----------------
type Role = "viewer" | "admin"

const PERMISSIONS: Record<Role, Record<Resource, Action>> = {
  viewer: {
    COURSE: "READ",
    LESSON: "READ",
    PIECE: "READ",
  },
  admin: {
    COURSE: "MANAGE",
    LESSON: "MANAGE",
    PIECE: "MANAGE",
  },
}

// -----------------
// Permission Check
// -----------------
function checkPermission(
  role: Role,
  action: Action,
  resource: Resource,
): boolean {
  const allowedAction = PERMISSIONS[role][resource] ?? "NONE"

  if (allowedAction === "MANAGE") {
    return true
  }

  const isAllowed = allowedAction === action
  return isAllowed
}

// -----------------
// React Context Implementation
// -----------------
interface CanContextType {
  role: Role
}

const CanContext = createContext<CanContextType | undefined>(undefined)

interface CanProviderProps {
  role: Role
  children: ReactNode
}

export function CanProvider({ role, children }: CanProviderProps) {
  return <CanContext.Provider value={{ role }}>{children}</CanContext.Provider>
}

const useCanContext = () => {
  const context = useContext(CanContext)
  if (!context) throw new Error("useCan must be used inside CanProvider")
  return context
}

export function useCan() {
  const { role } = useCanContext()
  return useCallback(
    (action: Action, resource: Resource) =>
      checkPermission(role, action, resource),
    [role],
  )
}

// -----------------
// Component Wrapper
// -----------------
interface CanProps {
  I: Action
  a: Resource
  children: ReactNode
  not?: boolean
}

export function Can({
  I: action,
  a: resource,
  children,
  not = false,
}: CanProps) {
  const canAccess = useCan()(action, resource)
  const shouldShow = not ? !canAccess : canAccess
  return shouldShow ? children : null
}
