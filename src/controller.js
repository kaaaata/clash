// testing game variables
// import { genCraftedCard } from './components/crafting/genCraftedCard';
import { createNewCard } from './cards/createNewCard';

const isTestingEnabled = true;
// const isTestingEnabled = false;

export const controller = isTestingEnabled ? {
  scene: 'town',

  yourName: 'Paladin',
  yourImage: 'paladin',
  enemyName: 'Slime',
  enemyImage: 'basic_slime',

  gold: 1000,
  goldBars: 10,
  energy: 10,
  day: 2,
  // lives: 1,

  // yourHand: ['Magic Scroll', 'Fire', 'Sword'].map(i => createNewCard(i)),
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
