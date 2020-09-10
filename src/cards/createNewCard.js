import { cards } from './cards';
import shortid from 'shortid';
import { cloneDeep } from 'lodash';
import { blueprints } from './blueprints';
import { cardTemplate } from './cardTemplate';
import { genCardDescription } from './genCardDescription';

// creates a new card object, and links a unique id to it.
export const createNewCard = (cardNameOrObject, customCardId) => {
  const cardProperties = typeof cardNameOrObject === 'object'
    ? cardNameOrObject
    : blueprints.allCardsObject[cardNameOrObject];

  const card = cloneDeep({
    ...cardTemplate,
    ...cardProperties,
    description: genCardDescription(cardProperties)
  });

  const cardId = customCardId || shortid.generate();
  cards[cardId] = card;
  return cardId;
};
