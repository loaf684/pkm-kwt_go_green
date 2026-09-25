# SIPTANI–MUTIARA — Next.js + Tailwind + Neon + Admin CMS

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, backed by a real Postgres database on
[Neon](https://neon.tech), with a password-protected admin panel to manage products.

## 1. First-time setup

```bash
npm install
```

**`.env.local` is already filled in** with the Neon connection string you provided, plus a
generated session-signing secret. **You still need to set a real `ADMIN_PASSWORD`** — it ships
as `"change-me-now"`, and the admin login will refuse to work until you change it:

```bash
# .env.local
ADMIN_PASSWORD="pick-something-only-you-know"
```

Then create the tables and load the two starting categories + six starting products:

```bash
npm run db:push    # creates/updates the categories, products, inquiries tables in Neon
npm run db:seed    # inserts "Tanaman Pangan"/"Sayuran" categories + the original 6 products
```

> **If you already ran `db:push`/`db:seed` from an earlier version of this project:** the schema
> changed — `products.category` (a fixed pangan/sayuran field) became `products.categoryId`, a
> real foreign key to a new `categories` table, and three image columns were added. `drizzle-kit
> push` can't safely invent that data migration on its own. Since this is almost certainly still
> a dev/test database at this point, the simplest path is to drop and start fresh:
> ```sql
> DROP TABLE IF EXISTS products, categories, inquiries, site_settings CASCADE;
> ```
> run that against your Neon database (via `npm run db:studio`, the Neon SQL editor, or `psql`),
> then run `db:push` and `db:seed` again as above.

`db:push` syncs the schema straight to the database (no migration files) — the simplest option
for a project this size. If you'd rather have versioned migration files (e.g. for a team, or to
review changes before applying them), use `npm run db:generate` then `npm run db:migrate`-style
Drizzle workflow instead; see [Drizzle's docs](https://orm.drizzle.team/docs/migrations).

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin — log in with the `ADMIN_PASSWORD` you set above

## 2. About that connection string

You pasted a live Neon password into this chat. That's fine — it's your database — but two
practical notes:

1. **This project's `.env.local` (including that password) is included in the zip you downloaded.**
   Treat the zip file itself as sensitive for the same reason you'd treat the password as
   sensitive: don't upload it somewhere public, attach it to an email thread with people who
   shouldn't have DB access, etc. `.env.local` is git-ignored (see `.gitignore`), so it's already
   set up to never get committed if you push this to GitHub.
2. Since the password has now passed through this chat, consider rotating it from the Neon
   dashboard (Project → Settings → Reset password) once you're done testing — not because
   anything is known to be wrong, just as routine hygiene for any credential that's been typed
   into a chat interface.

## 3. How the admin is protected

You asked for the admin to not be linked from the main site — that's done (no nav link anywhere
points at `/admin`), but **link-hiding by itself is not security**, since URLs get discovered,
crawled, or show up in logs. So on top of that, `/admin` is actually access-controlled:

- `src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts` — see note below) checks a
  signed, httpOnly session cookie on every `/admin/*` request and redirects to `/admin/login`
  if it's missing or invalid.
- `/admin/login` checks the password with a constant-time comparison against `ADMIN_PASSWORD`
  and, if correct, sets that signed cookie (7-day expiry).
- The admin pages also carry `robots: noindex` so search engines won't list them.

This is intentionally simple (one shared password, no user accounts) — appropriate for one or two
people managing a small catalog. If you need multiple admin users with separate logins later,
that's a bigger addition (real user accounts + a proper auth library like Auth.js).

## 4. What you can manage from `/admin`

- **Tampilan** (`/admin/settings`):
  - **Peta Google Maps Aktif** — type an address, a place name, coordinates, or paste a link you
    copied from Google Maps, and the Kontak and Beranda pages show a real, live, interactive
    Google Maps embed (no API key needed — it uses Google's link-based embed form). Leave it
    empty to show a plain photo/illustration instead.
  - **Images** — replace any of the site's illustrated graphics with your own: upload a file *or*
    paste a link, whichever's easier, exactly like product photos. Covers the logo in the menu
    bar, the homepage hero background, the shared banner behind the Tentang/Katalog/Kontak page
    titles, both images in "Tentang Kami", the Visi & Komitmen image, and a fallback map
    photo/illustration (used only when no live map is set above). Clear a field and save to go
    back to the built-in illustration — nothing ever breaks or shows blank.
- **Categories** (`/admin/categories`): create your own (e.g. "Buah-buahan"), see how many
  products use each, delete unused ones. You can also create a brand new category inline while
  adding/editing a product, without leaving that form.
- **Products** (`/admin`): add, edit, delete. Name, slug, category, stock (kg), price (Rp/kg),
  description, display order, and a **photo** — either upload a file (up to 5MB) or paste an
  image link. A product with no photo falls back to a built-in illustrated icon automatically.
- **Pesan Masuk (inquiries)**: a read-only list of the last several contact-form submissions —
  the public contact form now also logs to the database (best-effort; it still opens WhatsApp
  even if the database write fails, so a DB hiccup never blocks a visitor from reaching you).

Edits show up on the live site immediately (no cache to clear) — the affected pages are
revalidated automatically as part of each save/delete, including the footer's category links on
every page (even the ones that are otherwise static, like Tentang and Kontak).

### How product photos are actually stored

Uploaded files are stored as base64 text directly in the `products` table in Postgres (via a
`GET /api/products/[id]/image` route that serves them back with proper caching), rather than in a
separate file-storage service — that keeps the whole project to just the one Neon database you
already have, with nothing else to sign up for. It comfortably handles a catalog of dozens of
products. If you later have hundreds of products or much larger images, moving to something like
Vercel Blob or Cloudinary would be the next step — but that's a separate piece of work, not
something this build needs right now. Pasted image *links* aren't affected by any of this — they're
just stored as the URL and loaded directly from wherever they're hosted.

## 5. Running it for real (production build)

```bash
npm run build
npm run start
```

**Note on fonts:** exactly as before, `next/font/google` needs to reach `fonts.googleapis.com`
at build time. The sandbox I built this in has that domain blocked, so I verified the entire
build (including all the new admin/database code) by temporarily stubbing the font out, confirmed
a clean build, then restored the real font import. It'll build normally wherever you run it with
regular internet access.

**Note on the database at build time:** the pages that read products (`/`, `/katalog`, and all of
`/admin`) are marked `export const dynamic = "force-dynamic"`, meaning they're rendered per-request
rather than frozen at build time. That's also why `npm run build` doesn't need to reach your Neon
database at all — I was able to fully verify the build in a sandbox that can't reach Neon either.

## 6. Deploying

- **Vercel** (simplest): push to a Git repo, import at vercel.com, then add the three `.env.local`
  variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`) as Environment Variables in
  the project settings — don't rely on committing `.env.local` itself.
- **Any Node host**: `npm run build` then `npm run start`, with the same three env vars set.
- Still not a fully static host (Netlify's static drop, GitHub Pages) — same reason as before
  (`/katalog` reads a query string, and now several pages read the database), both of which need
  a Node runtime.

## Project structure

```
src/
  app/
    layout.tsx                 minimal root shell (html/body/fonts)
    (site)/                     route group — public marketing pages share this layout
      layout.tsx                 Header + PartnersStrip + Footer (Footer reads categories)
      page.tsx                    Beranda (fetches products + categories)
      tentang/page.tsx
      katalog/page.tsx             (fetches products + categories, reads ?kategori=)
      kontak/page.tsx
    admin/                       NOT in (site) — separate layout, no public header/footer
      layout.tsx                  admin shell (nav only shown once logged in)
      login/page.tsx
      page.tsx                     dashboard: product list (with photo thumbnails) + inquiries
      categories/page.tsx           list/create/delete categories
      settings/page.tsx              site-wide image overrides + live map (logo, hero, map, etc.)
      products/new/page.tsx
      products/[id]/edit/page.tsx
    api/
      products/[id]/image/route.ts       serves an uploaded product photo's bytes
      site-images/[key]/image/route.ts    serves an uploaded site-image's bytes
  proxy.ts                     route guard for /admin/* (Next.js 16's renamed middleware.ts)
  components/
    admin/                      LoginForm, ProductForm, NewCategoryForm, SiteImageForm, MapEmbedForm, Delete*Button
    ProductImage.tsx             product photo (URL or uploaded) → falls back to icon illustration
    SiteMedia.tsx                 any other site image override → falls back to its SVG illustration
    ...                         all the other public-site UI pieces from before
  lib/
    db/
      schema.ts                  Drizzle schema: categories, products, inquiries, site_settings
      index.ts                    Drizzle client (Neon HTTP driver)
      queries.ts                   reads used by the public site + admin (joins products↔categories)
      seed.ts                       run via `npm run db:seed`
    admin/
      session.ts                  sign/verify the admin cookie (Edge-safe, used by proxy.ts)
      password.ts                   constant-time password check (Node-only, Server Action side)
      actions.ts                     Server Actions: auth, categories, products, site images, map
    maps.ts                     turns an address/place/pasted link into a safe Google Maps embed URL
    site-images.ts               the list of editable image slots (key/label/hint) — add more here
    products.ts                 shared types (Product, Category) + WhatsApp link helpers (no DB import)
    actions.ts                  public-facing action: submitInquiry (contact form logging)
```

## What's still a stand-in

- **Partner/institutional logos** (STIP Tolitoli, Tut Wuri Handayani, BIMA, DIKTISAINTEK) → text
  badges in `src/components/PartnersStrip.tsx`, not the actual emblems. Everything else —
  including product photos now — comes from real data you control through `/admin`.
