import type { Knex } from "knex";

const TABLE_NAME = "links";

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

    table.string("url", 2048).notNullable();

    table.string("target", 20).notNullable().defaultTo("_self");

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.check(`
      target in (
        '_self',
        '_blank'
      )
    `);

    table.index(["target"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
