// testing game variables
import { cardsArray } from './cards/cards';
import { genCraftedCard } from './components/crafting/genCraftedCard';

const isTestingEnabled = true;
// const isTestingEnabled = false;

export const controller = isTestingEnabled ? {
  // gold: 0,
  // goldBars: 10,
  // energy: 10,
  // day: 1,
  // yourHand: ['Sword', 'Sword', 'Sword'],
  // yourDeck: ['Sword', 'Sword', 'Sword'],
  // yourDiscard: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'],
  // yourBanish: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'],
  // enemyHand: ['Sword', 'Sword', 'Sword'],
  // enemyDeck: ['Sword', 'Sword', 'Sword'],
  // enemyDiscard: [],
  // enemyBanish: [],
  
  startingDeck: [
    // genCraftedCard('Mace', 'Falchion'),
    // genCraftedCard('Fire Spear', 'Fire Spear'),
    // genCraftedCard('Multishot', 'Multishot'),
    // genCraftedCard('Ice Blade', 'Ice Blade'),
    // genCraftedCard('Healing Blade', 'Ice Blade'),
    // genCraftedCard('Healing Blade', 'Healing Blade'),
    // genCraftedCard('Sword', 'Greataxe'),
    // genCraftedCard('Falchion', 'Gladius'),
    // 'Healing Potion',
    // 'Fire',
    // 'Fire',
    // 'Mace',
    // 'Mace',

    // 'Frost',
  
    // 'Cutlass',
    // 'Cutlass',
    // 'Sword',
    // 'Sword',
    // 'Sword',

    // 'Falchion',
    // 'Mace',
    // 'Minotaur',
    // 'Cutlass',
    // 'Fire',

    // 'Falchion',
    // 'Super Fire',
    // 'Cutlass',
    // 'Cutlass',
    // 'Fire',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
    'Dragon Blade',
  ]
} : {};
