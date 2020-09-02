import { sample } from 'lodash';
import { cards } from '../cards/cards';

export const CardsArray = (_cards) => {
  const arr = _cards.map(card => ({
    ...(typeof card === 'string' ? cards[card] : card)
  }));

  arr.getTopCard = () => arr[arr.length - 1];

  arr.getRandomCard = () => sample(arr);

  arr.getRandomCardIndex = () => arr.length ? ~~(Math.random() * arr.length) : -1;

  arr.getRandomCardByFilter = (filterFunc) => sample(arr.filter(filterFunc));

  arr.getRandomCardIndexByFilter = (filterFunc) => {
    const filteredCardsWithIndices = arr
      .map((card, index) => ({ ...card, index }))
      .filter(filterFunc);
    return filteredCardsWithIndices.length ? sample(filteredCardsWithIndices).index : -1;
  };

  arr.getCardNames = () => arr.map(card => card.name);

  arr.removeTopCard = () => arr.pop();

  arr.removeCardAtIndex = (index) => arr.splice(index, 1)[0];

  arr.addCardToTop = (card) => {
    arr.push(card);
    return arr;
  };

  arr.addCardAtRandomIndex = (card) => {
    const index = ~~(Math.random() * arr.length);
    arr.splice(index, 0, card);
    return arr;
  };

  return arr;
};
