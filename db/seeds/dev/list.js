const list = [
  {
    id: 1,
    name: 'Shoes',
    reason: 'They suck',
    cleanliness: 'Rancid'
  },
  {
    id: 2,
    name: 'Football',
    reason: 'Unused',
    cleanliness: 'Dusty'
  },
  {
    id: 3,
    name: 'Shorts',
    reason: 'Too small',
    cleanliness: 'Sparkling'
  }
]

exports.seed = (knex, Promise) => {
  return knex('list').del()
    .then(() => {
      return Promise.all(list.map((item) => {
        return knex('list').insert(item);
      }));
    })
    .then(() => {
      console.log('Re-seeding Complete');
    })
    .catch(() => {
      console.log({ error: 'Error seeding data' });
    });
};