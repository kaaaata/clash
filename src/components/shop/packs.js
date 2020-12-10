// common card: 20gp (4/0)
// uncommon card: 30gp (6/0)
// rare card: 40gp (8/0)
// legendary card: 75gp (14/0)
// upgrade a card: 10gp (2/0)

export const packs = {
  energy: {
    name: 'Energy',
    cards: {
      legendary: 0,
      rare: 0,
      uncommon: 0,
      common: 0
    },
    cost: 50,
    image: 'energy'
  },
  bronze: {
    name: 'Bronze Pack',
    cards: {
      legendary: 0,
      rare: 0,
      uncommon: 0,
      common: 3
    },
    cost: 50,
    image: 'bronze_pack'
  },
  silver: {
    name: 'Silver Pack',
    cards: {
      legendary: 0,
      rare: 0,
      uncommon: 1,
      common: 2
    },
    cost: 100,
    image: 'silver_pack'
  },
  gold: {
    name: 'Gold Pack',
    cards: {
      legendary: 0,
      rare: 1,
      uncommon: 1,
      common: 1
    },
    cost: 150,
    image: 'gold_pack'
  },
  diamond: {
    name: 'Diamond Pack',
    cards: {
      legendary: 1,
      rare: 1,
      uncommon: 1,
      common: 0
    },
    cost: 200,
    image: 'diamond_pack'
  }
};
