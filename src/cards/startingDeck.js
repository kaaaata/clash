import { createNewCard } from './createNewCard';

export const startingDeck = [
  'Healing Potion',
  'Frost',
  'Frost',
  'Fire',
  'Fire',

  'Sword',
  'Sword',
  'Sword',
  'Sword',
  'Sword',

  'Cutlass',
  'Cutlass',
  'Cutlass',
  'Cutlass',
  'Cutlass',
].map(cardName => createNewCard(cardName));
