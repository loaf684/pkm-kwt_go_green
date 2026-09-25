import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CategoryRow = typeof categories.$inferSelect;
export type NewCategoryRow = typeof categories.$inferInsert;

// Fallback illustration shown when a product has no photo of its own.
export const iconEnum = pgEnum("product_icon", [
  "corn",
  "cornpale",
  "chili",
  "cucumber",
  "bokchoy",
  "eggplant",
  "leaf",
]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  stockKg: integer("stock_kg").notNull().default(0),
  priceRp: integer("price_rp").notNull().default(0),
  description: text("description").notNull().default(""),
  icon: iconEnum("icon").notNull().default("leaf"),
  // Exactly one of these two is set at a time (or neither, falling back to `icon`):
  imageUrl: text("image_url"), // a pasted external link
  imageData: text("image_data"), // base64-encoded bytes of an uploaded file
  imageType: text("image_type"), // MIME type for imageData, e.g. "image/jpeg"
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;

// Best-effort log of contact-form submissions. The contact form still opens
// WhatsApp even if this insert fails — this is just a record for the admin.
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  product: text("product"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InquiryRow = typeof inquiries.$inferSelect;
export type NewInquiryRow = typeof inquiries.$inferInsert;

// Simple key/value store for site-wide image overrides (logo, hero
// background, map, etc). A missing or null value means "use the built-in
// illustration" — see src/lib/site-images.ts for the list of keys.
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value"), // a pasted external link
  imageData: text("image_data"), // base64-encoded bytes of an uploaded file
  imageType: text("image_type"), // MIME type for imageData
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SiteSettingRow = typeof siteSettings.$inferSelect;
