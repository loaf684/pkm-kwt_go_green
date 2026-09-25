import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local first.");
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const seedCategories: schema.NewCategoryRow[] = [
    { name: "Tanaman Pangan", slug: "pangan", sortOrder: 1 },
    { name: "Sayuran", slug: "sayuran", sortOrder: 2 },
  ];

  const categoryIdBySlug = new Map<string, number>();
  for (const c of seedCategories) {
    const [row] = await db
      .insert(schema.categories)
      .values(c)
      .onConflictDoUpdate({ target: schema.categories.slug, set: { name: c.name, sortOrder: c.sortOrder } })
      .returning();
    categoryIdBySlug.set(c.slug, row.id);
    console.log(`Category ready: ${c.name}`);
  }

  const seedProducts: Array<Omit<schema.NewProductRow, "categoryId"> & { categorySlug: string }> = [
    { slug: "jagung-manis", name: "Jagung Manis", categorySlug: "pangan", stockKg: 45, priceRp: 15000, icon: "corn", sortOrder: 1, description: "Jagung manis segar dengan rasa manis alami. Dipanen langsung dari kebun Kelompok Mutiara Tani sehingga kesegarannya terjaga dan siap diolah menjadi berbagai hidangan favorit keluarga." },
    { slug: "cabai-merah", name: "Cabai Merah", categorySlug: "sayuran", stockKg: 50, priceRp: 30000, icon: "chili", sortOrder: 2, description: "Cabai merah segar hasil panen petani lokal dengan kualitas terbaik. Warna merah merata, pedas alami, dan cocok untuk kebutuhan dapur rumahan maupun usaha kuliner." },
    { slug: "jagung-pulut", name: "Jagung Pulut", categorySlug: "pangan", stockKg: 45, priceRp: 15000, icon: "cornpale", sortOrder: 3, description: "Jagung pulut berkualitas dengan tekstur pulen, rasa gurih, dan cocok untuk berbagai olahan pangan tradisional seperti jagung rebus, bubur, maupun jajanan khas daerah." },
    { slug: "mentimun", name: "Mentimun", categorySlug: "sayuran", stockKg: 30, priceRp: 8000, icon: "cucumber", sortOrder: 4, description: "Mentimun segar cocok untuk lalapan dan olahan makanan. Renyah, berair, dan dipetik pada tingkat kematangan yang pas untuk menjaga kesegaran lebih lama." },
    { slug: "sawi-hijau", name: "Sawi Hijau", categorySlug: "sayuran", stockKg: 30, priceRp: 7000, icon: "bokchoy", sortOrder: 5, description: "Sawi hijau segar kaya nutrisi dan siap dipasarkan. Daun hijau segar dan batang renyah, ideal untuk tumisan, sup, maupun aneka masakan sehat sehari-hari." },
    { slug: "terong-ungu", name: "Terong Ungu", categorySlug: "sayuran", stockKg: 30, priceRp: 10000, icon: "eggplant", sortOrder: 6, description: "Terong ungu segar hasil budidaya kelompok tani. Bertekstur lembut saat dimasak dan cocok untuk balado, sambal terong, hingga aneka olahan panggang." },
  ];

  for (const { categorySlug, ...p } of seedProducts) {
    const categoryId = categoryIdBySlug.get(categorySlug);
    if (!categoryId) throw new Error(`Unknown category slug in seed data: ${categorySlug}`);
    await db
      .insert(schema.products)
      .values({ ...p, categoryId })
      .onConflictDoUpdate({
        target: schema.products.slug,
        set: { ...p, categoryId, updatedAt: new Date() },
      });
    console.log(`Upserted: ${p.name}`);
  }

  console.log(`\nDone — ${seedCategories.length} categories and ${seedProducts.length} products seeded.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
