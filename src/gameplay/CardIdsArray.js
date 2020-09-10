import { sample } from 'lodash';

export const CardIdsArray = (cardIds) => {
  const arr = [...cardIds];

  arr.getTopCard = () => arr[arr.length - 1];

  arr.getRandomCard = () => sample(arr);

  arr.getRandomCardIndex = () => arr.length ? ~~(Math.random() * arr.length) : -1;

  arr.getRandomCardByFilter = (filterFunc) => sample(arr.filter(filterFunc));

  arr.getRandomCardIndexByFilter = (filterFunc) => {
    const filteredCardsWithIndices = arr
      .map((card, index) => ({ card, index }))
      .filter(filterFunc);
    return filteredCardsWithIndices.length ? sample(filteredCardsWithIndices).index : -1;
  };

  arr.getCardIds = () => [...cardIds];

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

export const CardsArray = (cards) => {
  const arr = [...cards];

  arr.getTopCard = () => arr[arr.length - 1];

  arr.getRandomCard = () => sample(arr);

  arr.getRandomCardIndex = () => arr.length ? ~~(Math.random() * arr.length) : -1;

  arr.getRandomCardByFilter = (filterFunc) => sample(arr.filter(filterFunc));

  arr.getRandomCardIndexByFilter = (filterFunc) => {
    const filteredCardsWithIndices = arr
      .map((card, index) => ({ card, index }))
      .filter(filterFunc);
    return filteredCardsWithIndices.length ? sample(filteredCardsWithIndices).index : -1;
  };

  arr.getCards = () => [...cards];

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
