# Mersal Foundation — website frontend (Next.js)

A redesigned, bilingual (Arabic RTL / English) frontend for [mersal-ngo.org](https://www.mersal-ngo.org), built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ar
npm run build && npm start
```

## Structure

| Path | What it holds |
|---|---|
| `src/app/[lang]/` | All routes, under the locale segment (`ar` default, `en`) |
| `src/app/[lang]/[section]/[slug]` | Projects, services and sustainability detail pages |
| `src/components/` | Header, Footer, donation form, Zakat calculator, shared UI |
| `src/content/*.json` | **Static content snapshot** taken from the live site's APIs |
| `src/lib/` | i18n helpers, content loaders, navigation |
| `src/proxy.ts` | Redirects `/` and un-prefixed paths to `/ar` or `/en` |
| `public/media/` | Images copied from the live site, resized and compressed |

Design tokens (colours, fonts, shadows) live in `src/app/globals.css` under `@theme`.

## Content

Content is a snapshot, not live. Each JSON file maps to an endpoint on `https://mersal-ngo.org`:

| File | Source endpoint |
|---|---|
| `pages.json` | `/MersalAPI/api/DynamicPages/GetPageById?Id=…` |
| `campaigns.json` | `/MersalAPI/api/CampaignsHomeCounter/GetAllCampaignsDonationsAmount` |
| `donation.json` | `/MersalAPI/api/DonationBanks/*`, `/DonationSlider/GetAllDonationSlider`, SysCode `DoDs` |
| `branches.json` | `/MersalAPI/api/BrancheDetails/GetAllBranches` |
| `albums.json` | `/MersalAPI/api/Albums/GetLastFourAlbums` |
| `faq.json` | Dynamic page 51 |

Campaign progress figures are therefore frozen at the snapshot date. To go live, replace the imports in `src/lib/content.ts` with cached `fetch` calls to those endpoints.

## Integration points (not connected yet)

These work as UI with validation, but do not send anything. Each form carries a `data-endpoint` attribute naming the backend action it replaces.

| Feature | File | Needs |
|---|---|---|
| Online donation / payment | `src/components/DonateForm.tsx` | Banque Misr Mastercard hosted checkout + FawryPay credentials, and the `Donation/ConfirmOnlineDonation` API |
| Home-collection request, contact, register a case, login, register | `src/components/forms.tsx` (`FormShell`) | The matching Mersal API actions and anti-forgery handling |
| Critical cases list | `src/app/[lang]/cases/page.tsx` | `/MersalAPI/api/Case/GetCasesHomeView` (returned no cases at snapshot time) |
| Album photo galleries | `src/app/[lang]/albums/page.tsx` | The album-photos endpoint (only covers were captured) |
