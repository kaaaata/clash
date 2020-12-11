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
  upgrades[upgrades.length - 1].cardProperties
);

// const doubleUpgradedCard = genUpgradedCard(
//   cards[upgradedCard],
//   upgrades[upgrades.length - 2].cardProperties
// );

export const controller = isControllerEnabled ? {
  // yourHand: [_genUpgradedCard('Sword'), _genUpgradedCard('Sword'), _genUpgradedCard('Sword')],
  yourHand: ['Golden Goblet', b, 'Greataxe'].map(i => createNewCard(i)),
  yourDeck: [
    // cards[upgradedCard],
    
    'Golden Goblet',
    'Golden Goblet',
    'Golden Goblet',
    'Golden Goblet'
  ].map(i => createNewCard(i)),
  // yourDeck: [
  //   ...Array(30).fill('Blank').map(i => createNewCard(i)),
  //   _genUpgradedCard('Sword'),
  //   _genUpgradedCard('Sword'),
  // ],
  yourDiscard: [b,b,b,b,b].map(i => createNewCard(i)),
  yourBanish: [b,b,b,b,b].map(i => createNewCard(i)),
  // enemyHand: ['Blank', 'Blank', 'Blank'].map(i => createNewCard(i)),
  // enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
} : {};
