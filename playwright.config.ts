import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npx serve out -p 4173 -L",
    port: 4173,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
