# My Dev Launchpad — Akash Paul's Portfolio

Personal portfolio of Akash Paul, full stack developer: intro, about and skills, work experience,
selected projects and contact links. Each section fills one screen, and scrolling between them is a
continuous scroll-linked transition under a sticky navbar.

Live site: <https://akkipaul2000.github.io/my-dev-launchpad/>

This repo is the home of the portfolio originally built in
[MyPortfolio](https://github.com/AkkiPaul2000/MyPortfolio) (Next.js 13 + Tailwind CSS 3 + Framer
Motion). That project's content, design and git history were merged in here and ported onto the
Lovable stack, so the site can keep evolving in the Lovable editor.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR) on Vite
- TypeScript
- Tailwind CSS v4
- [Framer Motion](https://motion.dev) for animations
- [react-icons](https://react-icons.github.io/react-icons/) for social and bullet icons
- shadcn/ui components (in `src/components/ui`), themed to the portfolio palette

## Project structure

```text
public/                     Images, favicon, logo and Resume.pdf
src/routes/__root.tsx       App shell: <head> meta, Google Fonts, 404 and error pages
src/routes/index.tsx        The one-page portfolio (/)
src/components/portfolio/   Portfolio sections
  Navbar, Banner, About, Experience, Projects, Contact, Footer
  LeftSide / RightSide      Fixed social and email rails (xl screens)
  SecAnimate                ScrollSection (page-to-page transition) and Reveal (items)
  scroll-to.ts              Smooth scrolling to a section below the sticky navbar
  social-links.tsx          Social profile links and contact email
src/lib/public-url.ts       Links to public/ files that work under any base path
src/styles.css              Tailwind theme: portfolio colors, fonts and breakpoints
.github/workflows/          GitHub Pages deployment
```

### Editing content

- **Experience**: edit the `jobs` array in `src/components/portfolio/Experience.tsx`.
- **Projects**: edit the `projects` array in `src/components/portfolio/Projects.tsx` (the first
  entry is shown as the featured project; each has a `liveUrl` and `repoUrl`), and put
  screenshots in `public/`.
- **Skills**: edit `skillGroups` in `src/components/portfolio/About.tsx`.
- **Social links and email**: edit `src/components/portfolio/social-links.tsx`.
- **Resume**: replace `public/Resume.pdf`.

Reference files in `public/` through `publicUrl("file.png")` (from `@/lib/public-url`) rather
than a hard-coded `"/file.png"`, or they will break on GitHub Pages, which serves the site from
`/my-dev-launchpad/`.

### Theme tokens

The original `tailwind.config.js` theme lives in `src/styles.css` as Tailwind v4 `@theme` tokens:

| Utility                                                                                         | Value                                             |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `text-textGreen`, `text-textLight`, `text-textDark`, `bg-bodyColor`, `bg-hoverColor`, `bg-navy` | Portfolio palette                                 |
| `font-bodyFont` / `font-titleFont`                                                              | DM Sans / Space Grotesk                           |
| `max-w-container` / `contentContainer` / `containerSmall` / `containerxs`                       | 1440 / 1140 / 1024 / 768px                        |
| `xs` `sm` `sml` `md` `mdl` `lg` `lgl` `xl` breakpoints                                          | 320 / 375 / 500 / 667 / 768 / 960 / 1024 / 1280px |
| `shadow-navbarShadow`                                                                           | Navbar drop shadow                                |

## Development

You need Node.js 20.19+ (or 22.12+) and npm or [bun](https://bun.sh).

```sh
git clone https://github.com/AkkiPaul2000/my-dev-launchpad.git
cd my-dev-launchpad
bun install   # or: npm i
bun run dev   # or: npm run dev
```

Other scripts: `build`, `preview`, `lint`, `format`.

## Deployment (GitHub Pages)

`.github/workflows/deploy-pages.yml` publishes the site on every push to `main` (or on demand from
the Actions tab). It builds with `PAGES_BASE_PATH` set, which switches `vite.config.ts` from the
Lovable/Cloudflare server build to a prerendered static site in `dist/client`. Lovable builds are
unaffected.

One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

To test the static build locally:

```sh
PAGES_BASE_PATH=/my-dev-launchpad/ bun run build   # output: dist/client
```

(On Windows Git Bash, prefix the command with `MSYS_NO_PATHCONV=1` so the path is not rewritten.)

## Build with Lovable

This project is connected to [Lovable](https://lovable.dev). Continue developing it in the
[Lovable editor](https://lovable.dev/projects/89575b00-9866-4692-b86c-8719ce7d15cc).

- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: push to `main` on GitHub and your changes sync back into Lovable, ready for
  your next prompt.
