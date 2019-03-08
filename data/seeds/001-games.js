
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title: 'PUBG', genre: 'Battle royale', releaseYear: 2017 },
        { title: 'Apex Legends', genre: 'Battle royale', releaseYear: 2019 }
      ]);
    });
};
