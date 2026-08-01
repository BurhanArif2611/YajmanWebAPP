# Loading States — Analysis & `boneyard-js` Recommendation

## What `boneyard-js` actually is

Checked before installing anything (unfamiliar package name, worth verifying):

- Real package: MIT licensed, GitHub repo `0xGF/boneyard`, homepage `boneyard.vercel.app`, actively released since April 2026 (36 versions). Not a typosquat/malicious dump — legitimate.
- Multi-framework skeleton-loading library (React/Vue/Svelte/Angular/Preact/React Native).
- Core idea: wrap your real component in `<Skeleton>`; a Playwright-driven CLI snapshots the component's *actual rendered DOM* (sizes, radii, nesting) and auto-generates a pixel-matching placeholder — no hand-written skeleton markup.
- Depends on `playwright` (full headless-browser automation). That means a Chromium binary download (~150–300MB) on install unless explicitly skipped, plus a `bin/cli.js` / Vite-plugin build step to wire up.

## Where "API call + loading time" actually happens in this codebase today

**Client components (`useQuery`) — flash-of-fallback or blank, no skeleton:**

| # | Location | Current behavior |
|---|----------|-------------------|
| 1 | `components/home/CategorySection.tsx` | No loading state — renders static `CATEGORIES` mock immediately, swaps to real data once loaded |
| 2 | `components/home/BestSellers.tsx` | Blank grid area while `servicesQuery.isLoading` |
| 3 | `components/home/HeroSection.tsx` | Same flash-of-fallback-icons pattern as CategorySection |
| 4 | `components/service/FilterSidebar.tsx` | Same flash-of-fallback pattern for category/type checkbox lists |
| 5 | `components/checkout/OrderSummary.tsx` | Coupon dropdown just appears once loaded, no indicator |
| 6 | `hooks/useNavLinks.ts` | No visual loading — label is static text, only the `href` silently upgrades once resolved |
| 7 | `hooks/useUnreadCount.ts` | No visual loading — the notification dot just appears once the count loads |
| 8 | `components/profile/PersonalDataForm.tsx` | Plain text: "Loading your profile..." |
| 9 | `components/profile/NotificationsView.tsx` | Plain text: "Loading notifications..." |

**Server components (async, awaited server-side) — no client loading state is even possible here:**

| # | Location |
|---|----------|
| 10 | `app/(site)/services/page.tsx` |
| 11 | `app/(site)/services/[category]/[slug]/page.tsx` |
| 12 | `app/(site)/checkout/page.tsx` |
| 13 | `app/(site)/profile/bookings/page.tsx` |
| 14 | `app/(site)/profile/bookings/[id]/page.tsx` |

None of these have a route-level `loading.tsx` (checked — zero exist in the project). Next.js just holds the previous page on screen (or shows blank) until the `await` resolves. This is arguably the most visible gap, and it has nothing to do with `boneyard-js`.

## Would `boneyard-js` fit?

- It targets cases #1–#9: React-rendered components with a visually complex shape where hand-describing a matching skeleton is tedious.
- It does nothing for #10–#14 — those need Next.js's own `loading.tsx` convention (free, built into the framework, unrelated to any skeleton library).

## Is it necessary?

**No.** Reasoning:

- The loading surfaces here are ~9 simple, repeating layouts (image + two lines of text + price, or a small badge/dot). Hand-writing a matching `animate-pulse` skeleton for each takes minutes — Tailwind's `animate-pulse` utility is already in this stack at zero extra cost.
- `boneyard-js`'s value (auto-derive skeleton shape from a live browser snapshot) pays off at a much larger scale — dozens of complex, frequently-changing layouts where manually maintaining skeletons becomes real upkeep. This app isn't at that scale.
- Cost: a new heavy transitive dependency (`playwright` + browser binary download), a build/CLI step to wire up, and a young, single-maintainer package to depend on for something this app can solve with a plain `<div>`.
- The most visible gap — blank server-rendered pages (#10–#14) — isn't solved by `boneyard-js` at all regardless.

## Recommended alternative (no new dependency)

1. Add small hand-written skeleton components (`animate-pulse` divs sized per card) for #1–#5, replacing the current flash-of-fallback/blank behavior.
2. Add `loading.tsx` under each of `services/`, `services/[category]/[slug]/`, `checkout/`, `profile/bookings/`, `profile/bookings/[id]/` — highest visible impact, zero dependency cost.
3. Swap the plain "Loading..." text in `PersonalDataForm`/`NotificationsView` for the same skeleton style, for consistency.

## If you still want `boneyard-js` anyway

Reasonable as a trial on one component first (e.g. the `BestSellers` cards) before adopting app-wide, given the `playwright` weight and package's young age — rather than installing it site-wide up front.
