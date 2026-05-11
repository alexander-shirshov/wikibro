import type { Knex } from "knex";

const TABLE_NAME = "git_settings";

export async function seed(knex: Knex): Promise<void> {
  const exists = await knex(TABLE_NAME).first();

  if (exists) {
    return;
  }

  await knex(TABLE_NAME).insert({
    enabled: false,
    branch: "main",
    content_path: "content",
    sync_mode: "manual",
  });
}
