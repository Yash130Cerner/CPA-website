# P. Shah Accounting and Tax Services

Marketing site for P. Shah Accounting and Tax Services. React + TypeScript + Vite, styled with Tailwind CSS v4, deployed on Vercel.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run preview    # serve the production build on :4173
npm run lint
```

## Contact form

The form posts JSON to `/api/contact`, a Vercel serverless function
([api/contact.ts](api/contact.ts)) that sends two emails through
[Resend](https://resend.com):

1. the inquiry to the practice, with `Reply-To` set to the visitor's address, and
2. a confirmation to the visitor.

A failure on the second email does not fail the request — the inquiry has
already arrived at that point.

### Required environment variables

Set these in the Vercel project (Settings → Environment Variables):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key. Without it the endpoint returns a 500 and the form shows the phone/email fallback. |
| `CONTACT_TO_EMAIL` | No | Where inquiries are delivered. Defaults to `cpapriyashah@gmail.com`. |
| `CONTACT_FROM_EMAIL` | No | The `From` address, e.g. `P. Shah Accounting <noreply@pshah-cpa.ca>`. |

### Before going live

`CONTACT_FROM_EMAIL` must be on a domain verified in Resend, otherwise
delivery to the visitor will fail. The default `onboarding@resend.dev`
only sends to the address that owns the Resend account, so it is
suitable for testing and not for production.

1. Add and verify `pshah-cpa.ca` in Resend (DNS records for DKIM/SPF).
2. Set `CONTACT_FROM_EMAIL` to an address on that domain.
3. Submit one real test inquiry and confirm **both** emails arrive.

### Testing locally

`npm run dev` runs the `/api` functions through a dev-only middleware in
[vite.config.ts](vite.config.ts), so the form works end to end without the
Vercel CLI. Create a `.env.local` (git-ignored, matches `*.local`) with:

```
RESEND_API_KEY=re_your_key_here
CONTACT_TO_EMAIL=your@email.com
```

Until a sending domain is verified, Resend runs in test mode and will
**only** deliver to the address that owns the Resend account. Set
`CONTACT_TO_EMAIL` to that address and enter the same address in the form,
otherwise the send fails with a 403.

`npm run preview` serves static files only — the API is not available there.

## Content

Nearly all copy lives in [src/data/content.ts](src/data/content.ts):
services, biography, testimonials, FAQs, contact details and navigation.
Editing that file is usually enough; the components read from it.

`heroContent.headline` is intentionally empty. While it is empty the Hero
renders the supporting paragraph as the page `<h1>`, so the page always has
exactly one `<h1>`. Setting a headline restores the two-part hero.

## Layout width

The site is capped at `--container-site` (1280px), defined in the `@theme`
block of [src/index.css](src/index.css) and applied with `max-w-site`.
Tailwind v4 generates `max-w-*` utilities from the `--container-*`
namespace, so the token must keep that prefix to work.
