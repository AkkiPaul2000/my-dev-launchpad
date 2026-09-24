// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (see .github/workflows/deploy-pages.yml): set PAGES_BASE_PATH, e.g.
// "/my-dev-launchpad/", to prerender a fully static site served from that sub-path.
// Unset (Lovable and local builds), nothing below changes.
const pagesBase = process.env["PAGES_BASE_PATH"];

export default defineConfig({
  ...(pagesBase && { nitro: false, vite: { base: pagesBase } }),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(pagesBase && {
      router: { basepath: pagesBase },
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages: [{ path: "/" }],
      sitemap: { enabled: false },
    }),
  },
});
