/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Mean Girls', user_added: false},
    {title: 'Hackers', user_added: false},
    {title: 'The Grey', user_added: false},
    {title: 'Sunshine', user_added: false},
    {title: 'Ex Machina', user_added: false},
  ]);
};
