import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "http://localhost:5078/openapi/v1.json",
  output: "./src/api/generated/client",
  plugins: [
    { name: "@hey-api/client-axios", baseUrl: "/", exportFromIndex: true },
    { name: "@hey-api/typescript", enums: "javascript" },
    { name: "@hey-api/sdk", asClass: false, transformer: false },
    { name: "@tanstack/react-query", exportFromIndex: true },
  ],
})
