

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tabs').del()
    .then(function () {
      // Inserts seed entries
      return knex('tabs').insert([
        {id: 1, name: 'YouTube', url: 'http://www.youtube.com', category_id: 1, notes: 'search youtube', user_id: 1 },
        {id: 2, name:'Google', url: 'http://www.google.com', category_id: 4, notes: 'search homework', user_id: 1 },
       
      ]);
    });
};
