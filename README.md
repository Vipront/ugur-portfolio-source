# Uğur Cem Yıldız portfolio

[English](README.md) | [Türkçe](README.tr.md) | [Live site](https://ugurcemyildiz.me)

A bilingual personal website about molecular biology, computational research and software. Research pages cover structure-based drug design and cancer bioinformatics. A small animated character, Mini Uğur, accompanies the pages.

![Portfolio homepage preview](docs/portfolio-preview.png)

Astro publishes six static pages. Shared CSS and browser scripts handle themes, animation and the research figure viewer. The main content can be read without a client-side framework.

## Run locally

Use Node.js 22.12 or newer:

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. To validate and build:

```sh
npm test
npm run build
npm run preview
```

Publish `dist/`. The configured production URL is `https://ugurcemyildiz.me`.

## Edit the active source

The six documents in `src/content/approved/` contain the reviewed HTML. `src/pages/` imports them; shared styles and interactions live in `public/*.css` and `public/*.js`.

Some older layout and profile files remain but are not used by the active routes. Editing them does not update the published pages. The reviewed HTML has not been converted into a component library. Parent-workspace generation helpers are not required for a production build.

## Languages and privacy

English pages link to `/cv.pdf`; Turkish pages link to `/cv-tr.pdf`. These CVs are intentionally public. Build checks cover language mapping, links, canonical URLs and public assets, and reject private thesis documents in `public/` and `dist/`.

This public source copy starts a new Git history. The private deployment repository and its old thesis downloads are not included. Historical hosting deployments still need a separate review; current build checks do not cover deleted material in earlier deployments.

`vercel.json` defines security headers. Inline theme scripts use exact SHA-256 hashes. After editing them, run `npm run security:headers` and review the policy. Inline styles remain allowed because the reviewed HTML and character rendering use them. Vercel preview toolbar scripts may be blocked by this policy.

## Assets and verification

Mini Uğur's WebP sprites preserve the original PNG pixels; source PNGs remain in the repository. The self-hosted Plus Jakarta Sans font includes English and Turkish characters. Its license is in `public/fonts/OFL.txt`.

See [validation](docs/VALIDATION.md) for checks run on this copy. Automated checks do not replace physical-phone, Safari or assistive-technology testing. Lighthouse results are lab measurements, not field INP.

## Authorship and reuse

Created by Uğur Cem Yıldız with AI assistance in implementation and verification. The research material reflects the author's biology and computational research work.

Original code and personal content are available for inspection under [LICENSE](LICENSE). Research figures, fonts and other third-party material retain their owners' rights and stated licenses. This repository grants no blanket reuse rights to those assets.
