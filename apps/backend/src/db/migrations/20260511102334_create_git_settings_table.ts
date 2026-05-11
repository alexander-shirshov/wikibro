import type { Knex } from "knex";

const TABLE_NAME = "git_settings";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.boolean("enabled").notNullable().defaultTo(false);

    table.string("repo_url", 1000).nullable();

    table.string("branch", 255).notNullable().defaultTo("main");

    table.string("content_path", 1000).notNullable().defaultTo("content");

    table.string("sync_mode", 20).notNullable().defaultTo("manual");

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.check("sync_mode in ('manual')");

    table.index(["enabled"]);
  });

  await knex.raw(`
    CREATE UNIQUE INDEX git_settings_singleton
    ON ${TABLE_NAME} ((true))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("DROP INDEX IF EXISTS git_settings_singleton");
  await knex.schema.dropTable(TABLE_NAME);
}
