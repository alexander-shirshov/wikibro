import type { Knex } from "knex";

const TABLE_NAME = "git_sync_logs";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("action", 20).notNullable();

    table.string("status", 20).notNullable();

    table.text("message").nullable();

    table.string("commit_hash", 100).nullable();

    table
      .uuid("triggered_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.check("action in ('pull', 'push', 'commit')");
    table.check("status in ('success', 'failed', 'running')");

    table.index(["action"]);
    table.index(["status"]);
    table.index(["triggered_by"]);
    table.index(["created_at"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
