import { keyBy } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';
import { allies } from './allies';
import { CardsArray } from '../gameplay/CardIdsArray';

// contains base card objects, to be used with createCard(). do not mutate!
export const blueprints = {
  attacks: CardsArray(attacks),
  magic: CardsArray(magic),
  potions: CardsArray(potions),
  allies: CardsArray(allies),

  allCardsArray: CardsArray([
    ...attacks,
    ...magic,
    ...potions,
    ...allies
  ])
};

blueprints.allCardsObject = keyBy(blueprints.allCardsArray, 'name');

blueprints.lootableCards = blueprints.allCardsArray
  .filter(card => card.type !== 'ally' && !card.isToken);

blueprints.lootableCardsByRarity = {
  common: blueprints.lootableCards.filter(card => card.rarity === 'common'),
  uncommon: blueprints.lootableCards.filter(card => card.rarity === 'uncommon'),
  rare: blueprints.lootableCards.filter(card => card.rarity === 'rare'),
  legendary: blueprints.lootableCards.filter(card => card.rarity === 'legendary')
};
