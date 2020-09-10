// testing game variables
// import { genCraftedCard } from './components/crafting/genCraftedCard';
import { createNewCard } from './cards/createNewCard';

const isTestingEnabled = true;
// const isTestingEnabled = false;

export const controller = isTestingEnabled ? {
  scene: 'town',
  yourName: 'Paladin',
  yourImage: 'paladin',

  gold: 1000,
  goldBars: 10,
  energy: 10,
  day: 2,
  // lives: 1,

  yourHand: ['Magic Scroll', 'Sword', 'Sword'].map(i => createNewCard(i)),
  // yourDeck: [].map(i => createNewCard(i)),
  // yourDiscard: [].map(i => createNewCard(i)),
  // yourBanish: [].map(i => createNewCard(i)),
  // enemyHand: [].map(i => createNewCard(i)),
  // enemyDeck: [].map(i => createNewCard(i)),
  // enemyDiscard: [].map(i => createNewCard(i)),
  // enemyBanish: [].map(i => createNewCard(i)),
  
  // startingDeck: [
    
  // ].map(i => createNewCard(i))
} : {};
