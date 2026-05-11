import type { Knex } from "knex";

const TABLE_NAME = "node_media";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("node_id")
      .notNullable()
      .references("id")
      .inTable("nodes")
      .onDelete("CASCADE");

    table
      .uuid("media_file_id")
      .notNullable()
      .references("id")
      .inTable("media_files")
      .onDelete("CASCADE");

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique(["node_id", "media_file_id"]);

    table.index(["node_id"]);
    table.index(["media_file_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
