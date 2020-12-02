import { sample, keyBy } from 'lodash';

// generate 8 random town actions
// at least one action is "gather gold"
// at least one action is "upgrade a card"
// the last action is "next day"
export const genTownActions = (guaranteedTownAction = '') => {
  const actions = [];

  if (guaranteedTownAction) {
    actions.push(townActions[guaranteedTownAction]);
  }

  for (let i = 0; i < (guaranteedTownAction ? 4 : 5); i++) {
    const action = townActions[sample(townActionPool)];
    actions.push({
      ...action,
      energy: action.energy
    });
  }

  actions.push(townActions['Gather Gold']);
  actions.push(townActions['Upgrade a Card']);

  actions.push({
    name: 'Next Day',
    energy: 0,
    image: 'clash_swords',
    description: 'Continue to the next battle.'
  });

  return actions;
};

export const genGuaranteedTownAction = () => (
  sample(Object.values(townActions).filter(
    name => !['Gather Gold', 'Upgrade a Card'].includes(name)
  ))
);

const townActions = keyBy([
  {
    name: 'Gather Gold',
    energy: 1,
    weight: 17,
    image: 'gold_with_padding',
    description: 'Gather 15-30 gold.'
  },
  {
    name: 'Upgrade a Card',
    energy: 1,
    weight: 4,
    image: 'gold_bar',
    description: 'Upgrade a card.'
  },
  {
    name: 'Blacksmith',
    energy: 1,
    weight: 2,
    image: 'dwarf',
    description: 'Purchase attack cards.'
  },
  {
    name: 'Mage',
    energy: 1,
    weight: 2,
    image: 'mage',
    description: 'Purchase magic attack cards.'
  },
  {
    name: 'Alchemist',
    energy: 1,
    weight: 2,
    image: 'alchemist',
    description: 'Purchase potion cards.'
  },
  {
    name: 'Recruiter',
    energy: 1,
    weight: 2,
    image: 'shop_girl',
    description: 'Purchase ally cards.'
  },
  {
    name: 'Donate a Card',
    energy: 0,
    weight: 1,
    image: 'weapons_guy',
    description: 'Remove a card from your deck.'
  },
  {
    name: 'Goblin\'s Game',
    energy: 2,
    weight: 1,
    image: 'goblin_boss',
    description: 'Spin the goblin\'s wheel!'
  },
  {
    name: 'Challenge Battle',
    energy: 3,
    weight: 1,
    image: 'catherine_the_great',
    description: 'A very difficult random encounter!'
  },
  {
    name: 'Treasure Chest',
    energy: 3,
    weight: 1,
    image: 'chest',
    description: 'A treasure chest! Contains treasure.'
  },
  {
    name: 'Dancing Lady',
    energy: 3,
    weight: 1,
    image: 'dancing_lady',
    description: 'A random encounter!'
  }
], 'name');
const townActionPool = [];
Object.values(townActions).forEach(action => {
  for (let i = 0; i < action.weight; i++) {
    townActionPool.push(action.name);
  }
});
