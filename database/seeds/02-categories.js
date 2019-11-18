exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, category: 'School'},
        {id: 2, category: 'Work'},
        {id: 3, category: 'Programming'},
        {id: 4, category: 'Music'},
        {id: 5, category: 'Cars'}
      ]);
    });
};
