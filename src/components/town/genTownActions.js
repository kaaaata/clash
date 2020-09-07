import { sample, keyBy } from 'lodash';

// generate 8 random town actions (the last one is always "next day").
export const genTownActions = () => {
  const actions = [];

  for (let i = 0; i < 9; i++) {
    const action = townActions[sample(townActionPool)];
    actions.push({
      ...action,
      energy: sample(action.energy)
    });
  }

  actions.push({
    name: 'Next Day',
    energy: 0,
    image: 'clash_swords',
    description: 'Continue to the next battle.'
  });

  return actions;
};

const townActions = keyBy([
  {
    name: 'Make Money',
    energy: [1, 2],
    probability: 15,
    image: 'gold_with_padding',
    description: 'Earn some gold.'
  },
  {
    name: 'Gold Bar',
    energy: [2, 3, 4],
    probability: 2,
    image: 'gold_bar',
    description: 'A free gold bar!'
  },
  {
    name: 'Blacksmith',
    energy: [2, 3, 4],
    probability: 1,
    image: 'dwarf',
    description: 'Purchase attack cards.'
  },
  {
    name: 'Mage',
    energy: [2, 3, 4],
    probability: 1,
    image: 'mage',
    description: 'Purchase magic attack cards.'
  },
  {
    name: 'Apothecary',
    energy: [2, 3, 4],
    probability: 1,
    image: 'alchemist',
    description: 'Purchase potion cards.'
  },
  {
    name: 'Recruiter',
    energy: [2, 3, 4],
    probability: 1,
    image: 'shop_girl',
    description: 'Purchase ally cards.'
  },
  {
    name: 'Donate a Card',
    energy: [0],
    probability: 2,
    image: 'weapons_guy',
    description: 'Remove a card from your deck.'
  },
  {
    name: 'Goblin\'s Game',
    energy: [4, 5, 6],
    probability: 2,
    image: 'goblin_boss',
    description: 'Spin the goblin\'s wheel!'
  },
  {
    name: 'Treasure Slime',
    energy: [4, 5, 6],
    probability: 2,
    image: 'treasure_slime_monster',
    description: 'A random encounter!'
  },
  {
    name: 'Challenge Battle',
    energy: [4, 5, 6],
    probability: 1,
    image: 'catherine_the_great',
    description: 'A very difficult random encounter!'
  },
  {
    name: 'Treasure Chest',
    energy: [6, 7, 8],
    probability: 1,
    image: 'chest',
    description: 'A treasure chest! Contains treasure.'
  }
], 'name');
const townActionPool = [];
Object.values(townActions).forEach(action => {
  for (let i = 0; i < action.probability; i++) {
    townActionPool.push(action.name);
  }
});
