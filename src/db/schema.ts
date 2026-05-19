import { 
  pgTable, 
  text, 
  timestamp, 
  uuid, 
  boolean, 
  integer, 
  numeric, 
  pgSchema,
  AnyPgColumn
} from 'drizzle-orm/pg-core';

export const authSchema = pgSchema('auth');
export const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().references(() => authUsers.id, { onDelete: 'cascade' }),
  fullName: text('full_name'),
  phone: text('phone'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  addressLine1: text('address_line1').notNull(),
  city: text('city').notNull(),
  district: text('district'),
  postalCode: text('postal_code'),
  isDefault: boolean('is_default').default(false),
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  parentId: uuid('parent_id').references((): AnyPgColumn => categories.id),
  sortOrder: integer('sort_order').default(0),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  categoryId: uuid('category_id').references(() => categories.id),
  brand: text('brand'),
  sku: text('sku').unique(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric('compare_at_price', { precision: 10, scale: 2 }),
  stockQuantity: integer('stock_quantity').default(0),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  weightGrams: integer('weight_grams'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  storageUrl: text('storage_url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').default(0),
  isPrimary: boolean('is_primary').default(false),
});

export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  variantName: text('variant_name').notNull(),
  variantValue: text('variant_value').notNull(),
  sku: text('sku'),
  price: numeric('price', { precision: 10, scale: 2 }),
  stockQuantity: integer('stock_quantity').default(0),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  status: text('status').default('pending'), // enum: pending | confirmed | shipped | delivered | cancelled | refunded
  paymentMethod: text('payment_method').default('cash'), // enum: cash | pos_terminal
  paymentStatus: text('payment_status').default('unpaid'), // enum: unpaid | paid
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }).default('0'),
  shippingAmount: numeric('shipping_amount', { precision: 10, scale: 2 }).default('0'),
  shippingAddressId: uuid('shipping_address_id').references(() => addresses.id),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id),
  variantId: uuid('variant_id').references(() => productVariants.id),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
});

export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // enum: percentage | fixed | free_shipping | buy_x_get_y
  value: numeric('value', { precision: 10, scale: 2 }),
  minOrderAmount: numeric('min_order_amount', { precision: 10, scale: 2 }).default('0'),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  isActive: boolean('is_active').default(true),
  usageLimit: integer('usage_limit'),
  usedCount: integer('used_count').default(0),
  appliesTo: text('applies_to').default('all'), // enum: all | category | product
});

export const coupons = pgTable('coupons', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }),
  code: text('code').notNull().unique(),
  isSingleUse: boolean('is_single_use').default(false),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').default(0),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true),
});

export const cart = pgTable('cart', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const cartItems = pgTable('cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  cartId: uuid('cart_id').references(() => cart.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id),
  variantId: uuid('variant_id').references(() => productVariants.id),
  quantity: integer('quantity').notNull().default(1),
});

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  role: text('role').default('editor'), // enum: super_admin | editor | viewer
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
