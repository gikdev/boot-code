import {
  TanStackDevtools,
  type TanStackDevtoolsReactInit,
  type TanStackDevtoolsReactPlugin,
} from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

const routerDevtools: TanStackDevtoolsReactPlugin = {
  name: "TanStack Router",
  render: <TanStackRouterDevtoolsPanel />,
  defaultOpen: false,
}

const queryDevtools: TanStackDevtoolsReactPlugin = {
  name: "TanStack Query",
  render: <ReactQueryDevtoolsPanel />,
  defaultOpen: true,
}

const plugins = [routerDevtools, queryDevtools]

const config: TanStackDevtoolsReactInit["config"] = {
  defaultOpen: false,
  theme: "dark",
  hideUntilHover: true,
  triggerHidden: true,
}

export const Devtools = () => (
  <TanStackDevtools config={config} plugins={plugins} />
)
