import { sample, keyBy } from 'lodash';

// generate 8 random town actions
// at least one action is "upgrade a card"
// the last action is "next day"
export const genTownActions = () => {
  const actions = [];

  for (let i = 0; i < 6; i++) {
    const action = townActions[sample(townActionPool)];
    actions.push({
      ...action,
      energy: action.energy
    });
  }

  actions.push(townActions['Upgrade a Card']);

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
    name: 'Gather Gold',
    energy: 1,
    probability: 15,
    image: 'gold_with_padding',
    description: 'Earn some gold.'
  },
  {
    name: 'Upgrade a Card',
    energy: 2,
    probability: 1,
    image: 'gold_with_padding',
    description: 'Earn some gold.'
  },
  {
    name: 'Extra Life',
    energy: 6,
    probability: 1,
    image: 'life',
    description: 'An extra life!'
  },
  {
    name: 'Blacksmith',
    energy: 2,
    probability: 1,
    image: 'dwarf',
    description: 'Purchase attack cards.'
  },
  {
    name: 'Mage',
    energy: 2,
    probability: 1,
    image: 'mage',
    description: 'Purchase magic attack cards.'
  },
  {
    name: 'Apothecary',
    energy: 2,
    probability: 1,
    image: 'alchemist',
    description: 'Purchase potion cards.'
  },
  {
    name: 'Recruiter',
    energy: 2,
    probability: 1,
    image: 'shop_girl',
    description: 'Purchase ally cards.'
  },
  {
    name: 'Donate a Card',
    energy: 0,
    probability: 1,
    image: 'weapons_guy',
    description: 'Remove a card from your deck.'
  },
  {
    name: 'Goblin\'s Game',
    energy: 3,
    probability: 1,
    image: 'goblin_boss',
    description: 'Spin the goblin\'s wheel!'
  },
  {
    name: 'Treasure Slime',
    energy: 4,
    probability: 1,
    image: 'treasure_slime_monster',
    description: 'A random encounter!'
  },
  {
    name: 'Challenge Battle',
    energy: 4,
    probability: 1,
    image: 'catherine_the_great',
    description: 'A very difficult random encounter!'
  },
  {
    name: 'Treasure Chest',
    energy: 5,
    probability: 1,
    image: 'chest',
    description: 'A treasure chest! Contains treasure.'
  },
  {
    name: 'Dancing Lady',
    energy: 4,
    probability: 1,
    image: 'dancing_lady',
    description: 'A random encounter!'
  }
], 'name');
const townActionPool = [];
Object.values(townActions).forEach(action => {
  for (let i = 0; i < action.probability; i++) {
    townActionPool.push(action.name);
  }
});
