import { cards } from '../../cards/cards';

export const genCraftedCard = (card1, card2) => {
  const type1 = cards[card1].type;
  const type2 = cards[card2].type;
  const name1 = cards[card1].name;
  const name2 = cards[card2].name;

  if (name1 === 'Fire' && name2 === 'Fire') {
    return 'Super Fire';
  } else if (name1 === 'Frost' && name2 === 'Frost') {
    return 'Super Frost';
  } else if (type1 === 'attack' && type2 === 'attack') {
    return 'Catherine the Great';
  } else if (
    (type1 === 'attack' && type2 === 'magic')
    || (type1 === 'magic' && type2 === 'attack')
  ) {
    return 'Catherine the Great';
  }
};
