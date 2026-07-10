# Repository Guidelines

## Project Structure & Module Organization

This is a **single-route SvelteKit static site** (`@sveltejs/adapter-static`), fully prerendered (`prerender = true`, `trailingSlash = 'always'`). There are no API routes or nested pages.

- `src/routes/+page.svelte` contains **only** the SEO `<svelte:head>` (title + meta description). All UI and logic live in `src/routes/+layout.svelte`, which acts as a desktop-OS-like shell: taskbar, app launcher, window manager, right-click context menu, and wallpaper picker.
- `src/lib/Components/` — reusable shell pieces: `Window.svelte` (draggable/resizable via the `moveable` package; z-stacking through the `incZIndex` store; closes by calling `moveable.destroy()` then `onClose`), `ContextMenu.svelte`, `WallpaperPicker.svelte`.
- `src/lib/Partitions/` — `About.svelte`, `Skill.svelte`, `Portfolio.svelte`, `Contact.svelte`. Each is rendered **inside** a `<Window>` via the `windows[]` `$state` array in the layout.
- `src/lib/Icons/` — PascalCase `IconXxx.svelte` components (inline Phosphor SVG paths) that accept only a `class` prop for Tailwind sizing/coloring.
- `src/lib/index.ts` — the only shared-state module: `svelte/store` writables `incZIndex`, `currentWallpaper` (persisted to `localStorage`), `wallpaperPreview`, `wallpaperLoading`.
- `src/lib/wallpapers.ts` — static manifest of 7 wallpapers following the rule `thumb-{N}.webp` → `/wallpaper/{N}.webp`.
- Images are placed in `static/` and referenced **by URL**, not imported, because the site is prerendered and those assets are outside the Vite module graph.

## Build, Test, and Development Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`; `.npmrc` sets `engine-strict=true`, `resolution-mode=highest`).

- `pnpm install` — install dependencies
- `pnpm dev` — start Vite dev server
- `pnpm build` — production build (outputs to `build/`)
- `pnpm preview` — preview the built site
- `pnpm check` / `pnpm check:watch` — run `svelte-check` (TypeScript + Svelte)
- `pnpm lint` — `prettier --check . && eslint .`
- `pnpm format` — `prettier --write .`

No automated test runner is configured.

## Coding Style & Naming Conventions

- ESLint uses a flat config (`eslint-plugin-svelte`, `typescript-eslint`, `eslint-config-prettier`) with Prettier 3.
- Prettier rules: tabs (`useTabs`), `singleQuote`, `trailingComma: none`, `printWidth: 100`, `prettier-plugin-svelte` (`.svelte` files parsed as `svelte`).
- TypeScript is **strict**. Use Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`) for component-local state and `svelte/store` writables for cross-component shared state.
- Components and icons are PascalCase; styling is Tailwind v4 (via `@tailwindcss/vite`) with the `Nunito` app font.
- Always run `pnpm lint` before committing.

## Commit & Pull Request Guidelines

- History mixes Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`) with some untyped messages. Prefer typed Conventional Commits and keep each commit focused on one change.
- No PR template is configured.
