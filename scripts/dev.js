// @ts-check

import { concurrently } from "concurrently"

concurrently([
  {
    command: "dotnet watch run",
    cwd: "apps/api",
    name: "API",
    prefixColor: "cyan",
  },
  {
    command: "npm run dev",
    cwd: "apps/web",
    name: "WEB",
    prefixColor: "green",
  },
])
