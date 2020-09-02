import { keyBy } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';
import { allies } from './allies';
import { CardsArray } from '../gameplay/CardsArray';

export const cardsArray = CardsArray([
  ...attacks,
  ...magic,
  ...potions,
  ...allies
]);
export const cards = keyBy(cardsArray, 'name');
const lootableCards = cardsArray
  .filter(card => card.type !== 'ally' && !card.isToken)
  .map(card => card.name);
export const lootableCardPool = {
  common: lootableCards.filter(card => cards[card].rarity === 'common'),
  uncommon: lootableCards.filter(card => cards[card].rarity === 'uncommon'),
  rare: lootableCards.filter(card => cards[card].rarity === 'rare'),
  legendary: lootableCards.filter(card => cards[card].rarity === 'legendary')
};
