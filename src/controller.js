// testing game variables
// import { genCraftedCard } from './components/crafting/genCraftedCard';
import { genUpgradedCard } from './components/crafting/genUpgradedCard';
import { upgrades } from './components/crafting/upgrades';
import { createNewCard } from './cards/createNewCard';
import { cards } from './cards/cards';
import { blueprints } from './cards/blueprints';
import { monstersByTier } from './monsters/monsters';

// const isTestingEnabled = true;
const isTestingEnabled = false;

const upgradedCard = genUpgradedCard(
  blueprints.allCardsObject['Sword'],
  upgrades[upgrades.length - 1].cardProperties
);

// const doubleUpgradedCard = genUpgradedCard(
//   cards[upgradedCard],
//   upgrades[upgrades.length - 2].cardProperties
// );

export const controller = isTestingEnabled ? {
  scene: 'town',

  yourName: 'Paladin',
  yourImage: 'paladin',
  monsterOverride: monstersByTier[1].filter(i => i.name === 'Fire Slime')[0],

  gold: 1000,
  goldBars: 10,
  energy: 10,
  day: 2,
  // lives: 1,

  // yourHand: [upgradedCard, upgradedCard, upgradedCard],
  yourHand: ['Shield', 'Minotaur', 'Mace'].map(i => createNewCard(i)),
  yourDeck: [
    'Healing Potion',
    'Fire',
    'Fire',
    'Mace',
    'Mace',
  
    'Cutlass',
    'Cutlass',
    'Sword',
    'Sword',
    'Sword',

    'Falchion',
    // 'Gladius',
    'Mace',
    // 'Mace',
    // 'Mace',

    // 'Paladin',
    // 'Healing Blade',
    // 'Longsword',
    // 'Attack Potion',
    // 'Frost',

    // 'Sword',
    // 'Cutlass',
  ].map(i => createNewCard(i)),
  // yourDiscard: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'].map(i => createNewCard(i)),
  // yourBanish: [].map(i => createNewCard(i)),
  // enemyHand: [].map(i => createNewCard(i)),
  // enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
  
  // startingDeck: [
    
  // ].map(i => createNewCard(i))
} : {};
