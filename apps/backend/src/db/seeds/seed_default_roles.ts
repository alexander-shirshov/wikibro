import type { Knex } from "knex";

const TABLE_NAME = "roles";

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME)
    .insert([{ name: "admin" }, { name: "editor" }, { name: "viewer" }])
    .onConflict("name")
    .ignore();
}
