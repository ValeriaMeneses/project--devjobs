
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('company', table => {
      table
        .integer('id')
        .unsigned()
        .references('companyId')
        .inTable('job');

      return table;
    })
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .table('company', table => {
      table.dropForeingn('id');
      table.dropColumn('id')
    })
};
