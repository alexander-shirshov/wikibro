import type { Knex } from "knex";

const TABLE_NAME = "nodes";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("parent_id")
      .nullable()
      .references("id")
      .inTable(TABLE_NAME)
      .onDelete("RESTRICT");

    table.string("type", 20).notNullable();

    table.string("title", 255).notNullable();

    table.string("slug", 255).notNullable();

    table.string("path_slug", 1000).notNullable().unique();

    table.string("icon", 100).nullable();

    table.integer("sort_order").notNullable().defaultTo(0);

    table.boolean("is_published").notNullable().defaultTo(false);

    table
      .uuid("created_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");

    table
      .uuid("updated_by")
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

    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.check("type in ('hub', 'folder', 'page', 'link')");

    table.index(["parent_id"]);
    table.index(["created_by"]);
    table.index(["updated_by"]);
    table.index(["deleted_by"]);
    table.index(["is_published"]);
    table.index(["deleted_at"]);
    table.index(["parent_id", "sort_order"]);
  });

  await knex.raw(`
    CREATE UNIQUE INDEX nodes_root_slug_unique
    ON nodes (slug)
    WHERE parent_id IS NULL
  `);

  await knex.raw(`
    CREATE UNIQUE INDEX nodes_parent_slug_unique
    ON nodes (parent_id, slug)
    WHERE parent_id IS NOT NULL
  `);

  await knex.raw(`
    ALTER TABLE ${TABLE_NAME}
    ADD CONSTRAINT nodes_hub_parent_check
    CHECK (
      type != 'hub'
      OR parent_id IS NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP INDEX IF EXISTS nodes_parent_slug_unique`);
  await knex.raw(`DROP INDEX IF EXISTS nodes_root_slug_unique`);

  await knex.schema.dropTable(TABLE_NAME);
}
