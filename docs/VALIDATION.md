# Publication validation

[English](VALIDATION.md) | [Türkçe](VALIDATION.tr.md)

Validated on 9 October 2026 (Europe/Istanbul):

- `npm ci`: passed in the clean source copy using `package-lock.json`.
- `npm run build`: passed; six static pages built.
- Source and built-output checks passed for canonical/language metadata, links/assets, script CSP hashes, private-file exclusion and English/Turkish CV mapping.
- Local Turkish homepage opened in the browser; its current screenshot is `portfolio-preview.png`.
- Gitleaks v8.30.1: no findings in the current source or original Git history.

The original history nevertheless contains two thesis Word documents. This copy starts a new history and excludes those files. Gitleaks checks secret patterns; it is not a personal-document classifier.

This publication changes documentation and adds preview images and a rights notice. It preserves the verified application-source commit `1f8e632fff49c58faa6dbbacacfd9ca6fb5e138e`; unrelated local CSS edits were not included. Browser interaction, accessibility and performance suites from earlier deployment work were not rerun as part of these documentation changes. No new phone, Safari or field-performance claim is made.
