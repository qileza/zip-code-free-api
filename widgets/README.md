# Embeddable ZIP Code Widgets

Four free iframe widgets you can drop onto any site. No account, no script, no
CSS conflicts — the widget runs in its own sandboxed frame.

Live previews + interactive configurator:
**[zipcodeandcounty.com/widgets](https://zipcodeandcounty.com/widgets)**

| Widget | URL | Good for |
|---|---|---|
| [Lookup](./lookup.html) | `/embed/lookup` | Real-estate listings, service-area pages |
| [Distance](./distance.html) | `/embed/distance` | Moving companies, travel blogs |
| [Nearby](./nearby.html) | `/embed/nearby` | Local-business directories, store locators |
| [County info](./county.html) | `/embed/county` | Genealogy, local news, regional blogs |

## Customization

All widgets accept the same query parameters:

| Param | Example | Effect |
|---|---|---|
| `theme` | `dark` | Dark colour scheme (default: light) |
| `accent` | `10b981` | Primary colour, any hex (no `#`) |
| `compact` | `1` | Tighter vertical spacing for sidebars |
| Widget-specific | `zip=90210`, `from=/to=`, `radius=25`, `fips=06037` | Pre-fill and auto-run |

Example:

```html
<iframe src="https://zipcodeandcounty.com/embed/lookup?theme=dark&accent=10b981&zip=90210"
        width="440" height="320"
        style="border:0;max-width:100%"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        title="ZIP lookup by zipcodeandcounty.com"></iframe>
```

## HTML files in this folder

- [`lookup.html`](./lookup.html) — Standalone ZIP lookup embed
- [`distance.html`](./distance.html) — Distance-between-two-ZIPs embed
- [`nearby.html`](./nearby.html) — "ZIPs within N miles" embed
- [`county.html`](./county.html) — County info card embed
- [`all-four.html`](./all-four.html) — Reference page showing all four at once

Open any of them in a browser — they're fully working. Use View Source to see
the exact HTML to copy.
