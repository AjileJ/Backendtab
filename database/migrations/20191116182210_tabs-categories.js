
exports.up = function(knex) {
  return knex.schema.createTable('categories', cate => {
    cate.increments()
    cate.string('category')
    .notNullable()
  })
  .createTable('tabs', tabs => {
    tabs.increments()
    tabs.string('url')
    .notNullable()
    tabs.string('name')
    tabs.string('notes')
    tabs.integer('user_id')
    .unsigned()
    .onUpdate('CASCADE')
    .onDelete('RESTRICT')
    .notNullable()
    .references('id')
    .inTable('users')
    tabs.integer('category_id')
    .unsigned()
    .onUpdate('CASCADE')
    .onDelete('RESTRICT')
    .defaultsTo(1)
    .notNullable()
    .references('id')
    .inTable('categories')
  })
};

exports.down = function(knex) {
   return knex.schema
  .dropTableIfExists('tabs')
  .dropTableIfExists('categories')
};

