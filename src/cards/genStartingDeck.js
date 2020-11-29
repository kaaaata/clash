import { createNewCard } from './createNewCard';

export const genStartingDeck = () => [
  'Healing Potion',
  'Frost',
  'Frost',
  'Frost',
  'Sword',

  'Sword',
  'Sword',
  'Sword',
  'Cutlass',
  'Cutlass',

  'Cutlass',
  'Cutlass',
].map(cardName => createNewCard(cardName));
