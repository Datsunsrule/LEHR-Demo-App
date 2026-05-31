# LEHR BuildBay — Work Plan & Change Log

Kiosk/tablet demo app (Vite + React 19 + Zustand + React Router v7 + Tailwind v4)
for outfitting emergency vehicles. Runs continuously on a tablet at trade shows;
reps walk customers through vehicle selection → build → estimate.

This file is updated after each change of meaningful size. Status legend:
✅ done · 🔄 in progress · ⬜ open · 🚫 won't fix (by design)

---

## Current state at a glance

**Code review (original audit)** — all High resolved (H1/H4/H5 fixed; H2/H3 are
by-design kiosk behavior); all Medium + Low done **except L7** (jsx-a11y blocked by
ESLint 10). Lint **0 errors**, `build` passes.

**Security** — lead PII obfuscated at rest (H1); CSV formula-injection blocked (M2).

**Accessibility** — WCAG 2.2 AA: focus-visible, names/roles/states, 24px targets,
label association, dialog semantics; **contrast audited & passing in BOTH themes**.

**Features added since the review**
- Lead-capture screen (formerly "login") is now toggleable from the top nav
  (persisted); "Start over" fully resets each session.
- **Desktop 2-column layout** at `lg`+ (≥1024px); mobile/tablet unchanged.
- **Light / dark mode** — semantic CSS-variable token system, follows OS with a
  persisted override toggle in every header; dark mode visually unchanged from the
  original.
- **Background images** optimized (PNG→WebP, ~93% smaller) and theme switch is
  instant (both images preloaded, opacity flip).

**Known follow-ups** — L7 (jsx-a11y when ESLint 10 supported); human AT/manual
a11y testing recommended; `sharp` devDep removable.

---

## Recently completed

### ✅ H1 — Lead PII no longer stored as plaintext in localStorage
- `src/store/useStore.js`: added an `obfuscatedStorage` wrapper (XOR + base64)
  and wired it via `persist`'s `storage: createJSONStorage(...)`.
- The persisted blob (`lehr-admin` key) is now non-human-readable instead of
  plaintext name/phone/email.
- Explicitly commented as **obfuscation, not encryption** — the key ships in the
  bundle, so it only deters casual kiosk/devtools inspection. Real protection
  needs server-side lead storage.
- Verified: round-trips Unicode/emoji; legacy/corrupt values fall back to
  defaults without throwing; `npm run build` passes.

### ✅ H4 + session-reset leak — fresh slate on every new walk-up
- `src/screens/LoginScreen.jsx`: the mount effect now calls **both**
  `clearUser()` and `resetBuild()` (read via `useStore.getState()`).
- Root issue found: `resetBuild` was defined but **never called anywhere**, so in
  the no-reload kiosk flow the previous customer's `paintScheme` / `fleetQty` /
  `equipment` carried over to the next customer. Now fully reset.
- Also fixes the H4 lint error (`set-state-in-effect`) and StrictMode double-fire:
  removed the redundant `setSkipForm(false)` (component remounts fresh each visit),
  and the resets are idempotent.
- Note: `taxRate` is intentionally NOT reset — it's a rep/location setting, not
  per-customer data.

### ✅ H5 — Removed dead `AppearanceTab` / theme system
- `src/components/AdminPanel.jsx`: deleted the unreachable `AppearanceTab`
  component (no `appearance` tab existed), its `theme`/`setTheme` subscriptions,
  and the now-unused `Sun`/`Moon` icon imports.
- `src/store/useStore.js`: removed `theme` state, `setTheme` action, and `theme`
  from `partialize`.
- The component's own note admitted light-mode was never wired up, so this was
  aspirational dead code. Cleared 3 lint errors; build passes.

### ✅ M1 / M2 / L1 — Lead export hardening + lint cleanup
- M2 (security): `src/components/LeadsTab.jsx` — added `escapeCsv()` that prefixes
  cells starting with `= + - @ \t \r` with a single quote, blocking spreadsheet
  formula injection (e.g. `=HYPERLINK(...)`) in exported/shared CSVs. Verified.
- M1: `shareLeads()` now distinguishes a user-cancelled share (`AbortError`, no
  fallback) from a real failure, guards `navigator.clipboard` existence, and
  returns a `'failed'` status that `handleShare` surfaces ("Could not share — use
  Export CSV"). Removes the empty `catch {}`.
- L1: removed dead `agencyLabel` and its `user` subscription from
  `src/screens/BuildBayScreen.jsx`.
- Lint is now **0 errors**; build passes.

### ✅ WCAG 2.2 AA pass — structural / programmatic criteria (M3, M4, M5, M6 partial)
Verified in-browser (renders, no console errors, 0 unnamed buttons, focus rule loaded).
- **2.4.7 Focus Visible**: global `:focus-visible` outline (2px #4da3f0) in
  `src/index.css` for all interactive elements; removed inline `outline:none` on
  PaintSelector that would have suppressed it. Added `prefers-reduced-motion`.
- **1.1.1 / 4.1.2 Name, Role, Value**: `aria-label` on every icon-only button
  (nav back/home/start-over, fleet stepper, admin gear, leads edit/delete/cancel,
  admin close/add/remove); decorative icons/SVGs/emoji marked `aria-hidden`.
- **1.3.1 Label association**: `InputField` now uses `useId()` + `htmlFor`/`id`;
  `aria-label` added to the tax-rate input, admin add-location/rep inputs, and
  leads edit inputs.
- **Toggle state**: equipment items `role=checkbox`+`aria-checked`; paint &
  location/rep selectors `aria-pressed`; category headers `aria-expanded`;
  fleet quantity `aria-live`.
- **2.5.8 Target Size (min 24px)**: bumped the sign-in skip toggle to 24px and
  gave admin remove (trash) buttons a 24px hit area.
- **M4 dialog**: `AdminPanel` now `role="dialog"` + `aria-modal` +
  `aria-labelledby`, closes on Escape, moves focus into the dialog on open.
  (Note: a full focus-trap library was not added — backdrop/Done/Esc all close.)

### ✅ WCAG 1.4.3 Contrast (Minimum) — passes AA (user-approved)
First attempt only lightened text (`#666/#555/#444 → #808080`); that was wrong —
the real backing behind text isn't black, it's the **photo** showing through the
near-transparent cards (`rgba(255,255,255,0.03)`), so light vehicle bodies tanked
contrast. Fixed the *surfaces*, not just the text:
- **Text**: muted grays now `#c2c2c2` (stepped up from `#808080`→`#969696`→`#c2c2c2`
  after the user reported the mid-grays still read poorly at 12px); three
  low-alpha login whites raised to `rgba(255,255,255,0.7)`.
- **Vehicle cards** (`VehicleSelectScreen`): dark glass `rgba(16,18,24,0.92)` +
  `backdrop-blur` instead of transparent white — gives text a dark backing
  regardless of the photo behind.
- **Background overlay** (`BackgroundLayer`): stronger, more uniform
  `linear-gradient(rgba(0,0,0,0.78)→0.85)` (was radial 0.55→0.75) so text laid
  directly on the photo (title blocks) keeps a dark backing.
- **Verified numerically in-browser against the brightest photo pixel** (worst
  case): carded subtitle **6.22:1**, directly-on-photo title metadata **4.65:1**
  — both ≥ 4.5:1 AA.
- Remaining minor unknown: the 8px `EquipmentOverlay` label sits on a translucent
  light patch over the vehicle photo — indeterminate, but it's a decorative
  preview annotation, not essential text.

### ✅ M8 / M9 / M10 — error boundary, image loading, VehicleHero perf
- **M8**: new `src/components/ErrorBoundary.jsx` (class) wraps `<App/>` in
  `main.jsx`; on a render error it shows a dark fallback with a "Reload demo"
  button instead of a blank screen. (Standard React pattern — not runtime
  crash-tested, but lint/build pass and it's wired at the root.)
- **M9**: `BackgroundLayer` moved into a persistent `Layout` route (`<Outlet/>`)
  so the full-viewport photo no longer remounts/refetches on every navigation —
  removed the per-screen `<BackgroundLayer>` from all 4 screens. Verified exactly
  one bg image across `/vehicle`→`/build`. Added `loading="lazy"`+`decoding="async"`
  to vehicle/paint thumbnails and `decoding="async"` to hero/logo/background.
- **M10**: `VehicleHero` overlay dedupe is now `useMemo`'d (keyed on
  `selectedEquipment`) and uses an O(n) `Set` on overlay label instead of the
  O(n²) `findIndex`.

### ✅ M6 / M7 / M11 / M12 + Lows — perf, structure, cleanup
Verified end-to-end in-browser (vehicle→build→toggle→estimate, no console errors).
- **M11**: `EquipmentCategory` now subscribes via `useShallow` to only its own
  items' selected flags — toggling one category no longer re-renders the other five.
- **M7**: add-input state moved into `LocationsTab`/`RepsTab`; `AdminPanel` passes
  the stable store actions (`addLocation`/`addRep`) directly, so typing no longer
  re-renders the whole panel or recreates closures.
- **M6**: hover/focus moved from inline JS `style` mutations to CSS classes
  (`.chrome-button`, `.vehicle-card`, `.glass-input`) — works for touch/keyboard
  and survives re-renders.
- **M12**: `LoginScreen.handleContinue` rewritten to set a populated user before
  navigating, no longer relying on call ordering.
- **L4**: `vite.config.js` base is now `process.env.VITE_BASE || '/LEHR-Demo-App/'`
  (overridable for non-Pages hosts) + Node globals override in eslint config.
- **L5**: deleted unused `src/App.css`.
- **L9**: `crypto.randomUUID()` wrapped in `uid()` with a non-crypto fallback for
  insecure (plain-http) origins.
- **L10**: `LehrLogo` sets `height` from the 600×194 intrinsic ratio → no CLS.
- **Misc**: `getCategories()` replaced with a module-level `categories` constant;
  `index.html` title/description fixed; tax input already capped at `max=100`.
- **L7 (NOT done — blocked)**: `eslint-plugin-jsx-a11y` only supports ESLint ≤ 9;
  this project is on ESLint 10, so it can't be added cleanly yet. Documented in
  `eslint.config.js`. Revisit when jsx-a11y ships ESLint 10 support.

### ✅ Lead-capture screen — nav-toggleable (replaces the `LOGIN_ENABLED` constant)
Reframed the "login" screen as what it actually is — an optional lead-generator
that collects visitor info — and made it switchable from the top nav.
- **Store**: `leadCaptureEnabled` (persisted) + `toggleLeadCapture`. Default off.
- **Routing** (`App.jsx`): `/` renders the form when enabled, else redirects to
  `/vehicle`; `RequireUser` reads the flag (guards the build flow only when on).
  Toggling off while on the form auto-redirects to `/vehicle` via the route logic.
- **Rename**: `LoginScreen.jsx` → `LeadCaptureScreen.jsx` (`LeadCaptureScreen`);
  heading "Sign In" → "Let's Get Started" / "Share your details and we'll tailor
  your build".
- **Nav control**: `LeadCaptureToggle` (UserPlus icon, red when on) in every
  header + the lead screen's admin bar; `aria-pressed` reflects state.
- Verified: enable → "Start over" lands on the form; disable on the form →
  redirects to vehicle select; choice persists.
- Downstream screens still fall back to `'Guest'` when no lead is captured.

### ✅ "Start over" reset on Home button (fixes the login-disabled tradeoff)
- New `src/hooks/useStartOver.js`: clears user + build state, navigates to `/`.
- Wired to the "Start over" (Home) button on all three screens, so each new
  walk-up gets a clean slate even with the login-screen reset chokepoint disabled.
- Works in both modes (with login enabled, LoginScreen's mount reset also runs —
  harmless, idempotent).
- Verified in-browser: build a config (1 item, fleet 2) → Start over → re-pick
  vehicle → 0 items selected, fleet back to 1.

### ✅ Desktop 2-column layout (lg+ / ≥1024px) — mobile/tablet untouched
The app was tablet/mobile-first: every screen a `max-w-2xl` (672px) centered
column with **zero responsive breakpoints**. Added a true desktop layout using
only `lg:` utilities, so anything below 1024px renders exactly as before.
- **VehicleSelect**: vehicle cards become a 2-column grid; container widened to
  `lg:max-w-5xl`.
- **BuildBay** (configurator): `lg:grid-cols-2` — left column = sticky vehicle
  preview + paint selector, right column = equipment catalog. Container
  `lg:max-w-6xl`. Sticky bottom `BuildSummaryBar` widened and laid out as a row
  (stepper+totals left, auto-width CTA right) on desktop.
- **Estimate**: `lg:grid` with equipment list (left) + sticky order-summary
  sidebar (right). DOM order preserved (equipment, summary, disclaimer) so mobile
  stacking is identical; desktop uses grid auto-flow placement.
- Breakpoint is `lg` (1024px). Verified in-browser: at 1280px all three screens
  are 2-column (measured side-by-side geometry, sticky positions); at 375px all
  are single-column, `display:flex`, `position:static` — unchanged.

### ✅ Light / dark mode (follows OS, with override)
The app had no theme system — colors were hardcoded. Introduced a semantic token
layer and migrated ~200 color literals to it.
- **Token system** (`src/index.css`): CSS variables on `:root` (dark default).
  Most translucent surfaces/borders use `rgba(var(--ink), α)` — flipping `--ink`
  white→ink inverts the whole system while keeping every alpha, so **dark mode is
  byte-identical to before**. Text/surface/header/bar tokens flip per theme.
- **OS-follow + override**: light tokens apply via
  `@media (prefers-color-scheme: light)` when no explicit choice is set, and via
  `:root[data-theme="light"]` when forced. Store `theme: 'system' | 'light' |
  'dark'` (persisted); `useTheme` reflects it onto `<html data-theme>`.
- **Backgrounds**: `BackgroundLayer` shows a per-theme image with a matching
  dark/light scrim (later optimized to WebP + preloaded — see below).
- **Toggle**: `ThemeToggle` (sun/moon) in every screen header; sets explicit
  light/dark.
- **Transition fix**: theme flip adds `.theme-switching` for one frame to kill
  transitions, preventing var()-based backgrounds from sticking mid-animation.
- Text that sits on dark image-overlays (Live Preview badge, paint labels,
  equipment overlays) is forced white in both themes.
- Verified in-browser: toggle flips body/cards/bg-image both ways.

### ✅ WCAG 2.2 AA contrast re-audit — both themes
Ran a programmatic contrast sweep (compositing each text element's color over its
ancestor backgrounds) in BOTH themes and fixed every real failure:
- `--text-dim` retuned: dark `#888888→#989898`, light `#6b7280→#4c5462` (equipment
  counts/prices were ~3.7–4.3 on the layered category surfaces).
- "Visual" badge moved to a themed `--accent-blue` (dark `#5aabf5`, light
  `#0a4578`) — was 1.5:1 (light) / 4.47 (dark).
- `EquipmentOverlay` marker darkened to `rgba(22,25,32,0.62)` so its white label
  passes (was a light marker → white text 1.59:1).
- Paint descriptions lightened to `#e6e6e6` (were 4.17 on the dark thumbnail scrim).
- Result: build/vehicle/estimate screens report **0 contrast failures** in both
  light and dark. Structural 2.2 criteria (2.4.7 focus, 2.5.8 target size, names/
  roles, labels, dialog) are theme-independent and unchanged. Focus ring is
  theme-aware via `--focus`.
- Caveats: the audit approximates the photo backing via the body color, so text
  laid over the photo through thin scrim is estimated, not exact; the red gradient
  CTA (white-on-red) is excluded as the script can't read gradient backgrounds.
  Human AT/manual testing still recommended for full certification.

### ✅ Background images optimized + instant theme switch
- **Optimized**: converted the two BGs from PNG → WebP via `sharp` (resized to
  1600px wide, q80): `darkBG` 2.12MB → 133KB (94% smaller), `lightBG` 2.51MB →
  200KB (92%). Originals moved to `image-originals/` (out of `public/`) so the
  2.5MB PNGs no longer ship in `dist`.
- **Instant switch**: `BackgroundLayer` now mounts BOTH webp images and toggles
  opacity (active 1 / inactive 0) instead of swapping `src`. Both load once on
  mount, so changing theme is a fetch-free, decode-free opacity flip. Verified:
  after toggle, both `<img>` stay `complete: true` and only opacities swap.
- `sharp` is a one-time dev tool (devDependency) — safe to `npm remove` if the
  BGs won't be re-exported.

### ✅ Admin location autocomplete (uniform City, State entry)
- New `src/data/usCities.js`: curated "City, State" list (~220 major US cities,
  full state names to match the existing format; all 50 states represented).
- New `src/components/LocationInput.jsx`: a **custom accessible combobox**
  (role=combobox/listbox/option, `aria-expanded`, `aria-activedescendant`, arrow/
  Enter/Escape keys, click select). Filters the list to ≤6 matches, drops
  already-added locations, and still allows free-typed custom values. Themed to
  match the app; opens upward so it isn't clipped by the modal.
- **Why not `<datalist>`** (first attempt): the `autocomplete="off"` we needed to
  stop the browser's own autofill *suppresses* the datalist popup in Chrome, and
  the native dropdown is unstyled / doesn't render in the headless preview. The
  custom combobox is reliable, on-brand, and verifiable.
- Verified in-browser: "San" → San Jose/San Francisco/Santa Ana/…; selecting an
  option adds it to the list, clears the input, and closes the dropdown; the list
  renders fully within the modal.

### ✅ Admin pricing display controls
New **Pricing** tab in the admin panel with two toggle switches (persisted):
- **Show item prices** (`showPrices`) — per-item `$` labels in the equipment
  catalog and the estimate line items (also drops price from their `aria-label`).
- **Show cost totals** (`showTotals`) — the running total in the build footer
  (`BuildSummaryBar`) and the estimate's Per-Vehicle row + entire Order Summary
  card.
- Store flags `showPrices` / `showTotals` (**default off** — reps opt in) +
  toggles; gated in `EquipmentCategory`, `BuildSummaryBar`, `EstimateScreen`.
  Persist `version: 1` + migrate drops any previously-persisted pricing flags so
  existing installs adopt the new off-by-default.
- Coherence touches: with totals off, the estimate collapses to a single column
  (no empty sidebar); with both off the footer CTA reads "View Summary" and the
  estimate title becomes "Build Summary" — a clean no-pricing spec sheet.
- Verified in-browser: both off → no `$` in catalog/footer/estimate, Order
  Summary hidden, adaptive labels applied.

---

## High-severity review items

| ID | Item | Status |
|----|------|--------|
| H1 | Lead PII plaintext in localStorage | ✅ done |
| H2 | Refresh on protected route redirects to `/` | 🚫 by design (no cross-customer carry-over) |
| H3 | Build state not persisted across refresh | 🚫 by design (same reason) |
| H4 | `clearUser` effect lint / StrictMode issue | ✅ done |
| H5 | Dead `AppearanceTab` + persisted `theme` setter | ✅ done |

## Backlog (from code review)

All Medium and Low items addressed — see the change-log entries above. The only
item NOT completed:
- **L7** — `eslint-plugin-jsx-a11y` blocked by ESLint 10 peer incompatibility
  (the `react` plugin was deliberately skipped as noisy; jsx-a11y was the
  valuable half). Revisit when the plugin supports ESLint 10.

Out of scope / by design: H2, H3 (kiosk fresh-session behavior). The login
screen remains disabled via `LOGIN_ENABLED` until re-enabled.
