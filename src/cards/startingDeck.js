import { createNewCard } from './createNewCard';

export const startingDeck = [
  'Healing Potion',
  'Frost',
  'Fire',
  'Mace',
  'Saber',

  'Cutlass',
  'Sword',
  'Sword',
  'Sword',
  'Sword',
].map(cardName => createNewCard(cardName));
