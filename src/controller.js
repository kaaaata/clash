// testing game variables
// import { genCraftedCard } from './components/crafting/genCraftedCard';
import { genUpgradedCard } from './components/crafting/genUpgradedCard';
import { upgrades } from './components/crafting/upgrades';
import { createNewCard } from './cards/createNewCard';
import { cards } from './cards/cards';
import { blueprints } from './cards/blueprints';

const isTestingEnabled = true;
// const isTestingEnabled = false;

// const upgradedCard = genUpgradedCard(
//   blueprints.allCardsObject['Sword'],
//   upgrades[upgrades.length - 1].cardProperties
// );

// const doubleUpgradedCard = genUpgradedCard(
//   cards[upgradedCard],
//   upgrades[upgrades.length - 2].cardProperties
// );

export const controller = isTestingEnabled ? {
  scene: 'town',

  yourName: 'Paladin',
  yourImage: 'paladin',
  enemyName: 'Slime',
  enemyImage: 'basic_slime',

  gold: 1000,
  goldBars: 10,
  energy: 10,
  day: 9,
  // lives: 1,

  // yourHand: [doubleUpgradedCard],
  // yourHand: ['Sword', 'Sword', 'Sword'].map(i => createNewCard(i)),
  // yourDeck: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'].map(i => createNewCard(i)),
  // yourDiscard: [].map(i => createNewCard(i)),
  // yourBanish: [].map(i => createNewCard(i)),
  // enemyHand: ['Sword', 'Sword', 'Sword'].map(i => createNewCard(i)),
  enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
  
  // startingDeck: [
    
  // ].map(i => createNewCard(i))
} : {};
