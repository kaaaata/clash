/* eslint-disable */

// testing game variables
import { genUpgradedCard } from './components/crafting/genUpgradedCard';
import { upgrades } from './components/crafting/upgrades';
import { createNewCard } from './cards/createNewCard';
import { cards } from './cards/cards';
import { blueprints } from './cards/blueprints';
import { monstersByTier } from './monsters/monsters';

let isControllerEnabled = false;
// isControllerEnabled = true;

const upgradedCard = genUpgradedCard(
  blueprints.allCardsObject['Sword'],
  upgrades[upgrades.length - 1].cardProperties
);

// const doubleUpgradedCard = genUpgradedCard(
//   cards[upgradedCard],
//   upgrades[upgrades.length - 2].cardProperties
// );

export const controller = isControllerEnabled ? {
  // yourHand: [upgradedCard, upgradedCard, upgradedCard],
  yourHand: ['Flowy Lady', 'Lich', 'Blank'].map(i => createNewCard(i)),
  // yourDeck: [
  //   // cards[upgradedCard],
    
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',

  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',

  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  //   'Dragon Blade',
  // ].map(i => createNewCard(i)),
  yourDeck: ['Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'].map(i => createNewCard(i)),
  yourDiscard: ['Blank', 'Paladin', 'Swordsman'].map(i => createNewCard(i)),
  yourBanish: ['Blank'].map(i => createNewCard(i)),
  // enemyHand: ['Blank', 'Blank', 'Blank'].map(i => createNewCard(i)),
  // enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
} : {};
