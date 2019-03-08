
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function(tbl) {
        tbl
            .increments()
            .notNullable();
        tbl
            .string('title', 156)
            .notNullable()
            .unique();
        tbl
            .string('genre', 64)
            .notNullable()
        tbl
            .integer('releaseYear');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
