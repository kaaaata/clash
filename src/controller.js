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

const b = 'Blank';

const _genUpgradedCard = (cardName) => genUpgradedCard(
  blueprints.allCardsObject[cardName],
  upgrades[upgrades.length - 5].cardProperties
);

// const doubleUpgradedCard = genUpgradedCard(
//   cards[upgradedCard],
//   upgrades[upgrades.length - 2].cardProperties
// );

export const controller = isControllerEnabled ? {
  // yourHand: [_genUpgradedCard('Candy Corn'), _genUpgradedCard('Candy Corn'), _genUpgradedCard('Candy Corn')],
  // yourHand: ['Knight', 'Blank', 'Vampire Blade'].map(i => createNewCard(i)),
  // yourDeck: [].map(i => createNewCard(i)),
  // yourDeck: [
  //   // cards[upgradedCard],
    
  //   'Golden Goblet',
  //   'Golden Goblet',
  //   'Golden Goblet',
  //   'Golden Goblet'
  // ].map(i => createNewCard(i)),
  // yourDeck: [
  //   ...Array(30).fill('Blank').map(i => createNewCard(i)),
  //   _genUpgradedCard('Sword'),
  //   _genUpgradedCard('Sword'),
  // ],
  // yourDiscard: ['Minotaur', 'Ice Whelp', 'Healing Potion', 'Falchion', 'Frost', 'Attack Potion'].map(i => createNewCard(i)),
  // yourBanish: [b,b,b,b,b].map(i => createNewCard(i)),
  // enemyHand: ['Sword', 'Falchion', 'Greataxe'].map(i => createNewCard(i)),
  enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
} : {};
