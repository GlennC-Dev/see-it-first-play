# Resume Download — Contact Card Dropdown

## Goal
Add a single "Download Resume" action to the existing "Ready to automate?" card in `src/components/Contact.tsx`. Clicking it reveals two options — a human-friendly version and an ATS-friendly version — each opening the corresponding Google Drive PDF preview in a new tab.

## Placement
Inside the existing card in `Contact.tsx`, directly under the two existing buttons ("Send me a message" and "Open chat assistant"). It becomes the third action, visually consistent with the other two.

## UI behavior
- Default state: one button labeled `📄 Download Resume ▾`, styled to match the existing "Send me a message" button (translucent white background, same padding, same radius) so it doesn't compete with the primary blue CTA.
- Click → opens a small dropdown menu (shadcn `DropdownMenu`, already in the project) with two items:
  - **Human-friendly version** — for hiring managers / recruiters
  - **ATS-friendly version** — for applicant tracking systems
- Each item is an `<a>` with `target="_blank"` and `rel="noopener noreferrer"` pointing to the corresponding Google Drive share URL. Clicking opens the Drive PDF preview in a new tab, where the user can hit Drive's download button.

## What I need from you
The two public Google Drive share URLs for the PDFs. They should look like:
`https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing`

I'll wire both into the component. If you don't have them ready yet, I can drop in placeholder URLs and you can swap them in later — just say the word.

## Files touched
- `src/components/Contact.tsx` — add the dropdown trigger + menu inside the existing card. No other files change. No new dependencies (shadcn `dropdown-menu` is already installed).

## Out of scope
- No Hero-section resume link (keeping it Contact-only as discussed).
- No Google Drive API connector — using plain public links.
- No analytics/tracking on clicks.
