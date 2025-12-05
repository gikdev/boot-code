import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { routeTree } from "./routeTree.gen"
import "./styles/index.css"

const router = createRouter({
  routeTree,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const container = document.querySelector("#root")
if (!container) throw new Error("No container element to render the app!")

const root = createRoot(container)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
