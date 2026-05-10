## Lock site in dark mode

**Changes:**

1. **`index.html`** — add `class="dark"` to `<html>` so dark mode is applied before React mounts (prevents flash of light theme).

2. **`src/components/Navbar.tsx`** — remove:
   - `isDark` state, `toggleTheme`, the `useEffect` that reads `localStorage`
   - The toggle `<button>` with the Sun/Moon icons
   - The `Moon`/`Sun` imports from lucide-react
   
   Keep the rest of the navbar (logo, nav links, Back-to-portfolio link) intact.

3. **`src/index.css`** (optional cleanup) — leave the `:root` light tokens in place but they'll be unused; no change needed unless you want them removed.

**Notes:**
- Any previously saved `theme: "light"` in a visitor's localStorage will be ignored since nothing reads it anymore.
- No changes to Tailwind config or design tokens — every component already uses semantic tokens that resolve correctly under `.dark`.
