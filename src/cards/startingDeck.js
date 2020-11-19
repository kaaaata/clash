import { createNewCard } from './createNewCard';

export const startingDeck = [
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
].map(cardName => createNewCard(cardName));
