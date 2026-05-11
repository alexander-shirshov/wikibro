import type { Knex } from "knex";

const TABLE_NAME = "settings";

export async function seed(knex: Knex): Promise<void> {
  const now = knex.fn.now();

  await knex(TABLE_NAME)
    .insert([
      {
        key: "app",
        value: JSON.stringify({
          appName: "WikiBro",
          defaultLocale: "en",
          allowRegistration: false,
        }),
        updated_at: now,
      },
    ])
    .onConflict("key")
    .ignore();
}
