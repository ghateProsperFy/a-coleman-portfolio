# Figma → Code Integration Rules (A Coleman Portfolio)

Authoritative rules for translating Figma designs into this codebase via the Figma MCP server (`get_design_context`, `get_screenshot`, `get_metadata`, `generate_diagram`, Code Connect, etc.).

> **Stack at a glance:** Next.js **16.2.4** (App Router) · React **19.2.4** · **JavaScript only** (no TypeScript) · **CSS Modules** + `globals.css` · `next/font/google` · No Tailwind, no shadcn, no component library, no design-token pipeline.
>
> **Project state:** Greenfield. Only `app/layout.js` + `app/page.js` (splash) exist today. Most decisions below are *forward-looking conventions* — when adding the first real components from Figma, follow these rules to set the foundation.

---

## 0. Hard Constraints (read first)

1. **Next.js 16 has breaking changes vs. training data.** Before writing any framework code, read the relevant guide in `node_modules/next/dist/docs/01-app/` (e.g. `01-getting-started`, routing, fonts, image, metadata). Heed deprecation notices. This rule is mandated by `AGENTS.md` and overrides memorized Next.js APIs.
2. **JavaScript only.** No `.ts` / `.tsx`. Components are `.js` / `.jsx`. Do not introduce TypeScript without an explicit ask.
3. **CSS Modules only.** Do not introduce Tailwind, styled-components, Emotion, vanilla-extract, or any CSS-in-JS without an explicit ask. Co-locate `*.module.css` next to the component.
4. **App Router, RSC by default.** Mark a component `"use client"` *only* when it needs hooks, browser APIs, event handlers, or context. Figma output is usually static markup → keep as a Server Component.
5. **The Figma MCP output is a reference, not final code.** The server returns React+Tailwind enriched with hints. **Translate Tailwind classes → CSS Module rules** in this project. Never paste Tailwind classes into JSX here.
6. **Single-block delivery.** When producing code from a Figma node, deliver one cohesive block per component (JSX + CSS Module + any token additions), not split snippets.

---

## 1. Token Definitions

### Where they live
- Global CSS custom properties: `app/globals.css` under `:root` (and `@media (prefers-color-scheme: dark)` for dark variants).
- Font tokens: injected as CSS variables by `next/font/google` in `app/layout.js`.

### Current tokens (baseline)
```css
/* app/globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

```js
// app/layout.js — font tokens
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSans    = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400","500","700"] });
// applied via <html className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable}`}>
```

### Format / structure
- **Plain CSS custom properties.** No Style Dictionary, no token transformer, no JSON token source.
- **Naming convention:** kebab-case, semantic-first (`--background`, `--foreground`). For new tokens, prefer the layered pattern below.

### Rules when importing Figma variables/styles
1. **Map Figma Variables → CSS custom properties in `:root`.** One variable = one custom property.
2. **Use a two-tier model when adding more than ~5 colors:**
   ```css
   :root {
     /* Tier 1 — primitives (mirror Figma color styles 1:1) */
     --color-black: #000000;
     --color-yellow-500: #ffd400;
     --color-neutral-50: #ededed;
     --color-neutral-950: #0a0a0a;

     /* Tier 2 — semantic aliases (what components consume) */
     --background: var(--color-black);
     --foreground: var(--color-yellow-500);
     --accent:     var(--color-yellow-500);
   }
   ```
3. **Components consume Tier 2 only.** Never reference primitives directly inside `*.module.css`.
4. **Spacing / radius / typography scales:** add as `--space-1`…`--space-12`, `--radius-sm/md/lg`, `--font-size-…`, `--line-height-…` — only when Figma actually defines a scale. Do not pre-invent one.
5. **Dark mode:** override Tier 2 inside `@media (prefers-color-scheme: dark)`. Leave primitives alone.
6. **Raw hex in CSS Modules is allowed only for one-off, intentionally non-tokenized values** (the splash `#ffd400` is an example). If a value appears in 2+ places or maps to a Figma variable, tokenize it.

### Token transformation
- **None today.** If the Figma file grows a real Variables system, the upgrade path is: pull tokens via the Figma MCP → write a small Node script that emits `app/styles/tokens.css` → `@import` it from `globals.css`. Do **not** add Style Dictionary or build-time pipelines preemptively.

---

## 2. Component Library

### Current state
- **No components exist yet.** Only `app/layout.js` (root layout) and `app/page.js` (splash).
- **No Storybook, no docs site, no Code Connect mappings.**

### Where new components go
```
app/
├── components/        ← shared UI primitives (Button, Card, Section, …)
│   └── Button/
│       ├── Button.js
│       └── Button.module.css
├── (routes)/...
└── layout.js
```
- **Co-locate** `Component.js` + `Component.module.css` in a folder named after the component.
- **Route-specific** components live next to the route segment they belong to (`app/work/_components/ProjectCard/…`). Use the underscore-prefix folder so it isn't treated as a route.
- **Default export** the component. Named-export sub-pieces if the Figma frame uses compound structure (e.g. `Card`, `Card.Header`, `Card.Body`).

### Component template (use this when generating from Figma)
```jsx
// app/components/Button/Button.js
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary", // primary | secondary | ghost — match Figma variants
  size = "md",         // sm | md | lg            — match Figma variants
  as: Tag = "button",
  ...props
}) {
  const className = [styles.root, styles[variant], styles[size]].join(" ");
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}
```
```css
/* app/components/Button/Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  border: 0;
  cursor: pointer;
}
.primary   { background: var(--accent); color: var(--background); }
.secondary { background: transparent;   color: var(--foreground); border: 1px solid currentColor; }
.ghost     { background: transparent;   color: var(--foreground); }

.sm { padding: 0.5rem 0.875rem; font-size: 0.875rem; }
.md { padding: 0.75rem 1.25rem; font-size: 1rem; }
.lg { padding: 1rem 1.75rem;    font-size: 1.125rem; }
```

### Rules when generating a component from a Figma node
1. **Match Figma variant axes → React props.** Use string unions (`"primary" | "secondary"`) — no enums, no boolean per-variant props.
2. **Match Figma layer names → semantic HTML.** Buttons → `<button>`, headings → `<h1>`–`<h6>` (respect document hierarchy), lists → `<ul>/<ol>`, navs → `<nav>`. Don’t default to `<div>` soup just because Figma exports flat frames.
3. **Class names:** `.root` for the outer element, then descriptive lowercase (`.title`, `.media`, `.actions`). For variants/sizes, use the variant token as a class (`.primary`, `.lg`).
4. **Compose className with `[a, b].join(" ")`** — do not pull in `clsx` / `classnames` unless the project already has it.
5. **Server Component by default.** Add `"use client"` only when the Figma prototype/interaction requires it (e.g. menu open state, form, scroll trigger).
6. **No prop spreading onto styled wrappers** — only spread onto the underlying HTML element (`<Tag {...props}>`).
7. **Run `npm run lint` after generating** (eslint with `eslint-config-next/core-web-vitals`).

### Code Connect
- **Not configured.** When the project has a stable component set, register mappings via `mcp__figma__add_code_connect_map` so future Figma fetches return our actual components instead of generic React+Tailwind. Until then, `get_code_connect_map` will be empty and that is expected.

---

## 3. Frameworks & Libraries

| Concern | Choice | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | `16.2.4` | **Read `node_modules/next/dist/docs/` before using framework APIs.** |
| UI runtime | React | `19.2.4` | Server Components default; RSC + Suspense available. |
| Language | JavaScript (ESM) | — | No TypeScript. `jsconfig.json` provides `@/*` alias. |
| Styling | CSS Modules + global CSS | native | No PostCSS plugins beyond Next.js defaults. |
| Fonts | `next/font/google` | bundled | Geist, Geist Mono, DM Sans. |
| Linting | ESLint flat config | `^9` | `eslint-config-next/core-web-vitals`. |
| Bundler | Turbopack (Next 16 default) | bundled | No custom webpack/Turbopack config in `next.config.mjs`. |
| Package manager | npm | — | `package-lock.json` is the source of truth. |

### Forbidden additions (without explicit user approval)
- TypeScript
- Tailwind / UnoCSS / any utility-first CSS
- styled-components / Emotion / vanilla-extract / CSS-in-JS
- shadcn/ui, Radix UI, Headless UI, MUI, Chakra
- `clsx`, `classnames`, `class-variance-authority`
- Storybook
- Framer Motion, GSAP (animations: prefer CSS / Web Animations API first)

---

## 4. Asset Management

### Where assets live
- **`public/`** — static, directly URL-addressable assets. Today: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (template leftovers — safe to delete when replaced).
- Reference from JSX with a leading slash: `src="/hero.jpg"`.

### Rules for assets pulled from Figma
1. **Raster (PNG/JPG/WebP):** export from Figma at **2× minimum**, drop into `public/images/<feature>/`. Use `next/image`:
   ```jsx
   import Image from "next/image";

   <Image
     src="/images/hero/portrait.jpg"
     alt="Anthony Coleman portrait"
     width={1600}
     height={2000}
     priority    // only for above-the-fold LCP images
   />
   ```
2. **Vector (SVG) decorative:** drop into `public/images/` and use `<img src="/…svg" alt="" />` or `next/image`. For inline manipulation (currentColor, animation), import as a React component (see §5).
3. **Always provide `width` + `height`** on `next/image` to prevent CLS. Get the intrinsic size from `get_metadata` on the Figma node.
4. **Always provide meaningful `alt`.** Decorative-only → `alt=""`. Never auto-generate alt text from Figma layer names.
5. **`priority`** only on the single LCP image per route. Everything else lazy-loads by default.
6. **Naming:** `kebab-case-feature-descriptor.ext` (e.g. `hero-portrait.jpg`, `case-study-acme-cover.webp`). No spaces, no PascalCase.

### Optimization
- `next/image` handles AVIF/WebP conversion, responsive `srcset`, and lazy loading automatically. Don’t hand-roll `<picture>` elements unless Figma demands art-direction at specific breakpoints — in which case use `next/image` with the `sizes` prop.
- No external CDN configured. Vercel serves `public/` directly through its edge network. If Figma fetches return remote URLs, do not embed them — download the asset, commit it to `public/`.

### `next.config.mjs`
- Currently empty. If you ever need remote image sources, add an explicit allowlist:
  ```js
  const nextConfig = {
    images: {
      remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
    },
  };
  ```

---

## 5. Icon System

### Current state
- **No icon library.** The five `public/*.svg` files are leftover Next.js template icons and are not a system.

### Recommended approach when Figma introduces icons
1. **Single source folder:** `app/components/icons/`.
2. **Each icon is its own React component** — keeps tree-shaking trivial and avoids a sprite build step.
   ```jsx
   // app/components/icons/ArrowRight.js
   export default function ArrowRight({ size = 24, ...props }) {
     return (
       <svg
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         aria-hidden="true"
         {...props}
       >
         <path d="M5 12h14M13 5l7 7-7 7" />
       </svg>
     );
   }
   ```
3. **Stroke/fill = `currentColor`.** Color the icon by setting `color` on the parent. This lets a single icon adapt to any token.
4. **Always set `aria-hidden="true"`** on decorative icons. For meaningful icons (icon-only buttons), wrap with an accessible label: `<button aria-label="Next"><ArrowRight /></button>`.
5. **Naming:** PascalCase component, matching the Figma layer name converted to PascalCase. `arrow-right` → `ArrowRight.js`. One icon per file. Default export.
6. **Do not install `lucide-react`, `react-icons`, `@heroicons/react`, etc.** unless the user explicitly asks. Ship only the icons we actually use, hand-extracted from Figma.
7. **Sizing:** accept a numeric `size` prop (defaults to 24). Don’t hard-code `width`/`height`.

### Pulling icons from Figma
- Use `get_design_context` on the icon frame → take the SVG markup from the response → drop into a new `app/components/icons/<Name>.js` using the template above. Strip Figma-specific attributes (`mask`, gradient ids you don’t need, `clip-path` artifacts) when safe.

---

## 6. Styling Approach

### Methodology
- **CSS Modules** (`*.module.css`) for component-scoped styles.
- **`app/globals.css`** for: CSS reset, root tokens, body defaults, color-scheme media query.

### Rules
1. **One `.module.css` file per component**, co-located in the component’s folder.
2. **Class naming:** lowercase, no BEM. Use `.root` for the outer element, descriptive nouns for inner parts (`.title`, `.media`), and variant tokens directly (`.primary`, `.lg`).
3. **Always reference tokens via `var(--token)`.** Don’t copy hex values from Figma into multiple `.module.css` files.
4. **Composition over `:global`.** Avoid `:global(...)` selectors. If a global utility is genuinely needed, add it to `globals.css`.
5. **Don’t use `@apply`, `@layer`, or PostCSS-specific syntax** — none of that is configured.
6. **Animations:** prefer CSS `@keyframes` + `transition` defined inside the component’s `.module.css`. Respect `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .root { animation: none; transition: none; }
   }
   ```

### Responsive design
- **Mobile-first.** Default styles target the smallest viewport; use `min-width` media queries to scale up.
- **Fluid typography** with `clamp()` (already established by `app/page.module.css`):
  ```css
  .title { font-size: clamp(3rem, 12vw, 10rem); }
  ```
- **Breakpoints** (use these consistently when Figma supplies discrete frames; otherwise prefer fluid `clamp` / `min()` / `max()`):
  - `--bp-sm: 40rem;`  (640px)
  - `--bp-md: 48rem;`  (768px)
  - `--bp-lg: 64rem;`  (1024px)
  - `--bp-xl: 80rem;`  (1280px)
  - Add these to `:root` in `globals.css` only when the first responsive component lands — don’t pre-add.
- **Container queries** are allowed (`@container`) when a component must adapt to its parent independently of the viewport.
- **Units:** `rem` for typography & spacing, `%` / `fr` for layout, `dvh`/`svh` for viewport-relative heights (`min-height: 100dvh` is already used on the splash).

### What to do with Figma absolute positioning
- The MCP server often returns absolutely-positioned layout when the Figma frame uses Auto Layout poorly. **Translate to flex/grid.** Don’t commit `position: absolute; left: 123px;` for layout — only for genuine overlays.

---

## 7. Project Structure

### Tree (current)
```
.
├── app/
│   ├── favicon.ico
│   ├── globals.css        ← root tokens, reset, body defaults
│   ├── layout.js          ← root layout, font CSS variables
│   ├── page.js            ← splash (replace as the portfolio grows)
│   └── page.module.css
├── public/                ← static assets served at /
├── AGENTS.md              ← Next.js 16 “read the docs” reminder
├── CLAUDE.md              ← imports AGENTS.md
├── FIGMA.md               ← this file
├── eslint.config.mjs      ← flat config, next core-web-vitals
├── jsconfig.json          ← path alias: "@/*" → "./*"
├── next.config.mjs        ← empty; add config only when needed
├── package.json
└── README.md
```

### Conventions for growth
- **Routes:** segment folders under `app/`. Each route has `page.js`, optional `layout.js`, `loading.js`, `error.js`, `not-found.js`. Read `node_modules/next/dist/docs/01-app/` before introducing a new file convention.
- **Route groups** (`app/(marketing)/...`) for organizing without affecting the URL.
- **Private folders** (`app/work/_components/...`) for route-scoped components that must not become routes.
- **Shared UI:** `app/components/<Name>/`.
- **Shared icons:** `app/components/icons/`.
- **Shared hooks/utils:** `app/lib/` (create only when there’s a real second consumer — no premature `lib/` for one helper).
- **Path alias:** import shared modules with `@/app/components/Button/Button` (the alias `@/*` resolves from project root). Use the alias for anything outside the current route segment; relative imports are fine within the same component folder.
- **No `src/` directory.** Don’t introduce one — `app/` lives at project root by current convention.

### Feature organization
- **Co-location first.** A route segment owns its components, styles, and assets unless a second route consumes them. Promote to `app/components/` only on the second use.
- **No barrel files (`index.js` re-exports)** unless a component has compound parts. Barrel files defeat tree-shaking and slow Turbopack HMR.

---

## 8. Figma MCP Workflow (the actual sequence to follow)

When the user shares a Figma URL or references a Figma node:

1. **Parse the URL** to extract `fileKey` and `nodeId` (convert `-` → `:` in `nodeId`). For `figma.com/design/:fileKey/branch/:branchKey/...`, use `branchKey` as the file key.
2. **Call `get_design_context`** with `fileKey` + `nodeId`. Treat the response as reference, not final code.
3. **Inspect what came back:**
   - Code Connect snippet present? → use the mapped component (none exist in this project yet).
   - Component documentation links? → follow them.
   - Design annotations? → respect designer notes.
   - Tokens as CSS variables? → map to our `:root` (§1).
   - Raw hex + absolute positioning? → the frame is loosely structured; lean on the screenshot and rebuild with flex/grid.
4. **Adapt to this stack:**
   - Tailwind classes → CSS Module rules with `var(--token)`.
   - TS types → JS prop defaults + JSDoc if helpful (no `.d.ts`).
   - Heroicons / lucide imports → hand-extract the SVG into `app/components/icons/` (§5).
   - `cn()` / `clsx` → `[a, b].filter(Boolean).join(" ")`.
   - Headless UI / Radix → native HTML (`<button>`, `<details>`, `<dialog>`) unless interaction complexity genuinely requires a primitive (then ask the user before installing).
5. **Place files** per §2 and §7. Update `app/globals.css` if new tokens are introduced (§1).
6. **Verify:**
   - `npm run lint` — must pass.
   - `npm run dev` — open the route in a browser, check the golden path on mobile + desktop widths, and inspect for layout shift / a11y warnings before reporting the task complete.
7. **Don’t** call `mcp__figma__send_code_connect_mappings` or modify the Figma file unless the user explicitly asks.

---

## 9. What NOT to do (quick reference)

- ❌ Don’t install Tailwind / shadcn / TypeScript / icon packages without asking.
- ❌ Don’t paste Tailwind classes from MCP output into JSX.
- ❌ Don’t hard-code colors that exist as Figma Variables — tokenize them in `globals.css`.
- ❌ Don’t `"use client"` a component that doesn’t need it.
- ❌ Don’t use `<img>` for raster images served from `public/` — use `next/image`.
- ❌ Don’t introduce `src/` or barrel files.
- ❌ Don’t skip reading `node_modules/next/dist/docs/` before using a Next.js API you haven’t verified for v16.
- ❌ Don’t deliver split snippets — one cohesive block per component (JSX + CSS + token additions).
