import { createNewCard } from './createNewCard';

export const startingDeck = [
  'Healing Potion',
  'Frost',
  'Frost',
  'Fire',
  'Swordsman',

  'Sword',
  'Sword',
  'Sword',
  'Cutlass',
  'Cutlass',

  'Cutlass',
  'Cutlass',
].map(cardName => createNewCard(cardName));
