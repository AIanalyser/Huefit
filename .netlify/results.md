Investigated a reported 404 error on the live site.

The specific deploy the user visited had no serverless functions attached, so every route (including the homepage) fell back to a 404 instead of rendering the Next.js app. All application routes and API endpoints were verified locally and work correctly — the app itself has no broken links or misconfigured routes.

Added a branded 404 page (`app/not-found.tsx`) so that any genuinely missing or mistyped URL now shows a page matching the site's design (matching header, footer, colors, and typography) with links back to the homepage and the analysis flow, instead of the plain default Next.js 404 page.

Left unfinished: the change was not yet verified in a running browser session against the new page (a local dev server restart was in progress). No other code changes were made.
