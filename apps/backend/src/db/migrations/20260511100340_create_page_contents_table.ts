import type { Knex } from "knex";

const TABLE_NAME = "page_contents";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("node_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable("nodes")
      .onDelete("CASCADE");

    table.text("draft_markdown").notNullable().defaultTo("");

    table.text("draft_html").notNullable().defaultTo("");

    table.text("published_markdown").notNullable().defaultTo("");

    table.text("published_html").notNullable().defaultTo("");

    table.string("status", 20).notNullable().defaultTo("draft");

    table
      .uuid("draft_updated_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");

    table
      .uuid("published_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .timestamp("draft_updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.timestamp("published_at", { useTz: true }).nullable();

    table
      .uuid("locked_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.timestamp("locked_at", { useTz: true }).nullable();

    table.timestamp("lock_expires_at", { useTz: true }).nullable();

    table.check(`
      status in (
        'draft',
        'published',
        'unpublished'
      )
    `);

    table.index(["status"]);
    table.index(["draft_updated_by"]);
    table.index(["published_by"]);
    table.index(["locked_by"]);
    table.index(["lock_expires_at"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
