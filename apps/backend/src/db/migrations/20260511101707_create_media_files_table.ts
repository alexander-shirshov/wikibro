import type { Knex } from "knex";

const TABLE_NAME = "media_files";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("original_name", 255).notNullable();

    table.string("stored_name", 255).notNullable().unique();

    table.string("mime_type", 100).notNullable();

    table.bigInteger("size_bytes").notNullable();

    table.string("storage_path", 1000).notNullable();

    table
      .uuid("uploaded_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");

    table
      .uuid("deleted_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.timestamp("deleted_at", { useTz: true }).nullable();

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.index(["uploaded_by"]);
    table.index(["deleted_by"]);
    table.index(["deleted_at"]);
    table.index(["mime_type"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
