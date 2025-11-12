import { useNavigate } from "@tanstack/react-router"

/**
 * Custom hook to predefine a navigation action
 * @param fn - function that receives the navigate function
 */
export function useNavigateTo(
  fn: (nav: ReturnType<typeof useNavigate>) => void,
) {
  const navigate = useNavigate()
  return () => fn(navigate)
}
