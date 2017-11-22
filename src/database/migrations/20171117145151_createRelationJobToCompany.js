
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('job', table => {
      table
        .integer('companyId')
        .unsigned()
        .references('id')
        .inTable('company');

      return table;
    })
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .table('job', table => {
      table.dropForeingn('companyId');
      table.dropColumn('companyId')
    })
};
