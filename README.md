# KWT Go Green Griya Asri

Website katalog dan pemesanan hasil pertanian Kelompok Wanita Tani. Pengunjung dapat melihat produk, memilih beberapa item ke keranjang, lalu mengirim pesanan melalui WhatsApp. Pengelolaan produk dan konten situs tersedia di panel admin.

## Teknologi

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4
- Neon PostgreSQL dengan Drizzle ORM
- Deployment yang didukung: Vercel atau host Node.js

## Menjalankan secara lokal

### 1. Pasang dependensi

```bash
npm install
```

### 2. Siapkan variabel lingkungan

Salin `.env.example` menjadi `.env.local`, lalu isi nilainya:

```powershell
Copy-Item .env.example .env.local
```

Di macOS/Linux, gunakan `cp .env.example .env.local`.

| Variabel | Nilai |
| --- | --- |
| `DATABASE_URL` | Connection string Neon PostgreSQL |
| `ADMIN_PASSWORD` | Password kuat untuk panel admin |
| `ADMIN_SESSION_SECRET` | Secret acak untuk menandatangani sesi admin |

Buat secret sesi dengan `openssl rand -base64 32`. Jangan commit `.env.local` atau membagikan nilai rahasianya.

### 3. Siapkan database

```bash
npm run db:push
npm run db:seed
```

`db:push` menyinkronkan schema ke database. `db:seed` membuat kategori awal dan enam produk contoh; menjalankannya kembali akan memperbarui data produk contoh yang slug-nya sama. Jangan jalankan seed pada data produksi tanpa memeriksa `src/lib/db/seed.ts` terlebih dahulu.

### 4. Jalankan aplikasi

```bash
npm run dev
```

- Situs: <http://localhost:3000>
- Panel admin: <http://localhost:3000/admin>

## Fitur

### Situs publik

- Beranda, Tentang Kami, Katalog Produk, dan Kontak.
- Katalog dengan pencarian dan filter kategori.
- Detail produk, stok, dan harga dengan satuan `kg`, `pack`, atau satuan khusus yang dipilih per produk.
- Keranjang multi-produk dengan pengaturan jumlah, hapus item, dan kosongkan keranjang. Jumlah dibatasi oleh stok.
- Checkout membuka WhatsApp dengan daftar produk dan total pesanan.
- Formulir kontak yang meneruskan pesan ke WhatsApp dan mencoba mencatat pengiriman tanpa menghambat proses pemesanan.

### Panel admin

- Login menggunakan satu password bersama; sesi disimpan dalam cookie `httpOnly` bertanda tangan dan berlaku tujuh hari.
- Tambah, ubah, dan hapus produk serta kategori.
- Kelola stok serta harga per kilogram, pack, atau satuan khusus seperti ikat dan buah; termasuk deskripsi, urutan, dan foto produk.
- Kelola logo, gambar hero, banner halaman, gambar Tentang Kami, gambar Visi & Komitmen, dan lokasi Google Maps.
- Lihat dan hapus pesan masuk dari formulir kontak.

Panel admin tidak ditautkan dari navigasi publik, tetapi aksesnya tetap dilindungi autentikasi. Gunakan password kuat dan simpan ketiga variabel lingkungan dengan aman.

Foto yang diunggah disimpan di database sebagai data gambar; ukuran unggahan maksimum adalah 5 MB. Gambar juga dapat ditambahkan melalui URL.

## Perintah proyek

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Membuat build produksi |
| `npm run start` | Menjalankan build produksi |
| `npm run lint` | Menjalankan ESLint |
| `npm run db:push` | Menyinkronkan schema database |
| `npm run db:seed` | Membuat atau memperbarui data contoh |
| `npm run db:generate` | Membuat berkas migrasi Drizzle |
| `npm run db:migrate` | Menjalankan migrasi Drizzle |
| `npm run db:studio` | Membuka Drizzle Studio |

Untuk perubahan schema yang perlu ditinjau dan dilacak, gunakan alur migrasi `db:generate` lalu `db:migrate`. Gunakan `db:push` terutama untuk pengembangan.

Perubahan satuan produk menambahkan enum dan kolom `unit` dengan nilai awal `pack` untuk produk yang sudah ada. Sebelum deploy versi ini, terapkan migrasi `drizzle/0001_product-unit.sql` dengan `npm run db:migrate` menggunakan connection string database langsung (tanpa `-pooler`).

## Deployment

1. Impor repository ke Vercel atau siapkan host Node.js.
2. Tambahkan `DATABASE_URL`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` di environment deployment. Pastikan `DATABASE_URL` tersedia saat build maupun runtime.
3. Terapkan migrasi yang tersedia dengan `npm run db:migrate` menggunakan connection string langsung sebelum aplikasi versi baru menerima traffic. Seed data hanya jika memang diinginkan.
4. Build dengan `npm run build`, lalu jalankan `npm run start` jika menggunakan host Node.js.

## Struktur penting

```text
src/
  app/
    (site)/                  Halaman publik
    admin/                   Panel admin
    api/                     Endpoint gambar yang tersimpan di database
  components/                Komponen UI publik dan admin
  lib/
    admin/                   Autentikasi dan aksi admin
    db/                      Schema, koneksi, query, dan seed database
    actions.ts               Pencatatan formulir kontak
    maps.ts                  Lokasi dan URL embed Google Maps
    products.ts              Tipe produk dan helper WhatsApp
    site-images.ts           Daftar gambar situs yang dapat diubah
  proxy.ts                   Proteksi rute admin
drizzle/                      Schema snapshot dan migrasi database
```
