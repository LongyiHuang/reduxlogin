

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function(table) {
        table.increments('id').primary();
        table.string('username',64).notNullable().unique();
        table.string('email',64).notNullable().unique();
        table.string('password_digest').notNullable();
        table.timestamps();
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};




