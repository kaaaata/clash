// testing game variables
import { cardsArray } from './cards/cards';
import { genCraftedCard } from './components/crafting/genCraftedCard';

const isTestingEnabled = true;
// const isTestingEnabled = false;

export const controller = isTestingEnabled ? {
  // scene: 'main_menu',
  // yourName: 'paladin',
  // yourImage: 'paladin',

  // gold: 100,
  // goldBars: 10,
  // energy: 10,
  // day: 9,
  // lives: 1,

  // yourHand: [
  //   'Falchion','Falchion','Falchion'
  // ],
  // yourDeck: ['Healing Potion', 'Sword', 'Sword', 'Sword'],
  // yourDiscard: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'],
  // yourBanish: ['Sword', 'Sword', 'Sword', 'Sword', 'Sword', 'Sword'],
  // enemyHand: ['Falchion','Falchion','Falchion'],
  // enemyDeck: ['Healing Potion', 'Sword', 'Sword', 'Sword']
  // enemyDiscard: [],
  // enemyBanish: [],
  
  // startingDeck: [
  //   genCraftedCard('Mace', 'Falchion'),
  //   genCraftedCard('Fire Spear', 'Fire Spear'),
  //   genCraftedCard('Multishot', 'Multishot'),
  //   genCraftedCard('Ice Blade', 'Ice Blade'),
  //   genCraftedCard('Healing Blade', 'Ice Blade'),
  //   genCraftedCard('Healing Blade', 'Healing Blade'),
  //   genCraftedCard('Sword', 'Greataxe'),
  //   genCraftedCard('Falchion', 'Gladius'),
  //   // 'Healing Potion',
  //   // 'Fire',
  //   // 'Fire',
  //   // 'Mace',
  //   // 'Mace',

  //   // 'Frost',
  
  //   // 'Cutlass',
  //   // 'Cutlass',
  //   // 'Sword',
  //   // 'Sword',
  //   // 'Sword',

  //   // 'Falchion',
  //   // 'Mace',
  //   // 'Minotaur',
  //   // 'Cutlass',
  //   // 'Fire',

  //   // 'Falchion',
  //   // 'Super Fire',
  //   // 'Cutlass',
  //   // 'Cutlass',
  //   // 'Fire',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  //   // 'Dragon Blade',
  // ]
} : {};
