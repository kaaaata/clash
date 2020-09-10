import { controller } from '../controller';
import { createNewCard } from './createNewCard';

export const startingDeck = controller.startingDeck || [
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
