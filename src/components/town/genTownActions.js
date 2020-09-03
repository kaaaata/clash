import { sample } from 'lodash';

// generate 8 random town actions (the last one is always "next day").
export const genTownActions = () => {
  const actions = [];

  for (let i = 0; i < 7; i++) {
    actions.push(sample(townActionPool));
  }

  actions.push({
    name: 'Next Day',
    energy: 0,
    image: 'clash_swords',
    description: 'Continue to the next battle.'
  });

  return actions;
};

const townActions = [
  // {
  //   name: 'Work for Gold',
  //   energy: [1, 2],
  //   probability: 6,
  //   image: 'gold',
  //   description: 'Earn some gold.'
  // },
  // {
  //   name: 'Buy Weapons',
  //   energy: [4, 5, 6, 7],
  //   probability: 4,
  //   image: 'slice',
  //   description: 'Obtain attack cards.'
  // },
  // {
  //   name: 'Learn Magic',
  //   energy: [4, 5, 6, 7],
  //   probability: 3,
  //   image: 'double_fireball',
  //   description: 'Obtain magic cards.'
  // },
  // {
  //   name: 'Brew Potions',
  //   energy: [4, 5, 6, 7],
  //   probability: 2,
  //   image: 'blue_potion',
  //   description: 'Obtain potion cards.'
  // },
  // {
  //   name: 'Recruit Allies',
  //   energy: [4, 5, 6, 7],
  //   probability: 3,
  //   image: 'mage',
  //   description: 'Obtain ally cards.'
  // },
  // {
  //   name: 'Donate a Card',
  //   energy: [0],
  //   probability: 1,
  //   image: 'weapons_guy',
  //   description: 'Remove a card from your deck.'
  // },
  // {
  //   name: 'Spin the Wheel',
  //   energy: [2, 3, 4],
  //   probability: 1,
  //   image: 'goblin_boss',
  //   description: 'Spin the goblin\'s wheel!'
  // },
  // {
  //   name: 'Treasure Slime',
  //   energy: [2, 3, 4],
  //   probability: 1,
  //   image: 'treasure_slime_monster',
  //   description: 'A random encounter!'
  // }
];
const townActionPool = [];
townActions.forEach(action => {
  for (let i = 0; i < action.probability; i++) {
    townActionPool.push({
      ...action,
      energy: sample(action.energy)
    });
  }
});
