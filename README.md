# NFR AI Cost Estimator

An interactive, single-file presentation tool that estimates the cost of a **shared enterprise AI platform** serving Non-Financial Risk (NFR) and adjacent functions, for DACH banking, insurance, healthcare and telecom clients.

It is built for non-technical executives: it walks from a few inputs to an all-in annual cost, shows what drives it, models the 18-month gains vs. cost, and lets the user play with model routing and assumptions.

## Use it

Everything is contained in **`index.html`** — no build step, no dependencies to install. The only external resource is the Google Fonts CDN, so an internet connection is needed for the intended typography (it still works without it).

- **Locally:** open `index.html` in a browser, or run any static server (e.g. `python3 -m http.server`) and open the page.
- **GitHub Pages:** push this repo, then enable Pages under *Settings → Pages → Build and deployment → Deploy from a branch* (root of `main`). Because the file is named `index.html`, it is served at the root URL automatically.

## What's inside

- Industry / region / currency selection (DACH; EUR & CHF)
- Shared-platform cost allocation across adjacent departments (each unlocks its scenarios and changes NFR's share)
- Scenario picker with per-scenario dashboard specs and compute reasoning
- Vendor-neutral, benchmark-driven model routing across hosting modes (cloud / EU-sovereign / on-prem)
- "What drives it", "18-month gains", "One question" and "Models & math" views, with animated explainers
- PDF exports: a client summary and a full methodology / calculation breakdown

## Important

All numbers in this tool are **illustrative planning placeholders**, not measured values. Model benchmarks and prices, routing weights, allocation shares, build and upkeep rates, dashboard-coverage assumptions, hosting infrastructure and governance coefficients must be calibrated against real delivery, chargeback and evaluation data before any client use.

This tool is **not an offer, proposal, quotation or commitment**, and creates no contractual obligation. Brand and product names other than Accenture are placeholders for licensed assets.
