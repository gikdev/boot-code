import type { Config } from "@master/css"
import { variables } from "@master/css"

const config: Config = {
  variables: {
    "font-family": {
      main: ["Vazirmatn", "sans-serif"],
    },
    color: {
      primary: variables.color.indigo,
    },
  },
} satisfies Config

export default config
