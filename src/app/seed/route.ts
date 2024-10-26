import { sql } from 'kysely';
import { db } from '@/lib/kysely';
import bcrypt from 'bcrypt';
import { user, sellers, invoices } from '@/lib/placeholder-data';

async function seedUser() {
  await db.schema.dropTable('users').ifExists().execute();
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', col => col.defaultTo(sql`gen_random_uuid()`).primaryKey())
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('email', 'text', col => col.notNull().unique())
    .addColumn('password', 'text', col => col.notNull())
    .execute();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  db.insertInto('users')
    .values({ ...user, password: hashedPassword })
    .execute();
}

async function seedSellers() {
  await db.schema.dropTable('sellers').cascade().ifExists().execute();
  await db.schema
    .createTable('sellers')
    .addColumn('id', 'serial', col => col.primaryKey())
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('email', 'text', col => col.notNull())
    .addColumn('avatar', 'text', col => col.notNull())
    .execute();

  const nextId = Math.max(...sellers.map(seller => +seller.id)) + 1;
  await sql`ALTER SEQUENCE sellers_id_seq RESTART WITH ${sql.lit(nextId)}`.execute(db);

  await db.insertInto('sellers').values(sellers).execute();
}

async function seedInvoices() {
  await db.schema.dropTable('invoices').ifExists().execute();
  await db.schema.dropType('payment_status').ifExists().execute();
  await db.schema.dropType('payment_method').ifExists().execute();

  await db.schema.createType('payment_status').asEnum(['Pending', 'Paid']).execute();
  await db.schema
    .createType('payment_method')
    .asEnum(['Credit Card', 'Bank Transfer', 'PayPal'])
    .execute();
  await db.schema
    .createTable('invoices')
    .addColumn('id', 'serial', col => col.primaryKey())
    .addColumn('status', sql`payment_status`, col => col.notNull())
    .addColumn('amount', 'decimal', col => col.notNull())
    .addColumn('paymentMethod', sql`payment_method`, col => col.notNull())
    .addColumn('sellerId', 'serial', col =>
      col.references('sellers.id').onDelete('cascade').notNull(),
    )
    .addColumn('createdAt', 'timestamp', col => col.notNull())
    .execute();
  await sql`ALTER SEQUENCE invoices_id_seq RESTART WITH 1000`.execute(db);

  await db.insertInto('invoices').values(invoices).execute();
}

export async function GET() {
  try {
    await seedUser();
    await seedSellers();
    await seedInvoices();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
