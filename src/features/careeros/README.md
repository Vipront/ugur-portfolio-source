# CareerOS portfolio module

All product content and dedicated assets live in this folder. Shared portfolio styles, fonts, navigation styling, and Mini Uğur behavior are reused without modification.

From the portfolio repository:

```sh
npm run careeros:disable
```

This sets `config.json` to `enabled: false` and builds a six-page site. Both CareerOS routes, home-page navigation links, sitemap entries, and dedicated public assets disappear. Deploy the resulting build to remove CareerOS from the live site. Old hosted deployments and search-engine caches are separate from the current deployment.

To restore the module:

```sh
npm run careeros:enable
```

The module is read at build time. Editing the flag alone does not change a deployed site. The route bridge in `src/pages/[...careeros].astro` generates only the two module paths when enabled and no paths when disabled.

The shared portfolio renderer includes the CareerOS navigation and home showcase only when enabled. The source contract checks the same transformed documents used by the pages. Preparation removes only the three named module-owned asset files (CSS, demo image and compact demo preview); it never recursively deletes a directory.
