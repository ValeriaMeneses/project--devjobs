
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('job', table => {
      table.increments();

      table.string('title');
      table.string('description');
      table.string('location');
      table.integer('salary');
      table.boolean('fullTime');
      table.integer('companyId');
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('job');
};
