import { cards } from '../cards/cards';
import { rarityScore } from '../cards/rarity';

const sortFunc = (a, b) => {
  const cardA = cards[a];
  const cardB = cards[b];
  if (rarityScore[cardA.rarity] > rarityScore[cardB.rarity]) {
    return -1;
  } else if (rarityScore[cardA.rarity] < rarityScore[cardB.rarity]) {
    return 1;
  } else if (cardA.attack > cardB.attack) {
    return -1;
  } else if (cardA.attack < cardB.attack) {
    return 1;
  } else if (cardA.defense > cardB.defense) {
    return -1;
  } else if (cardA.defense < cardB.defense) {
    return 1;
  } else if (cardA.description && !cardB.description) {
    return -1;
  } else if (!cardA.description && cardB.description) {
    return 1;
  }

  return 0;
};

export const selectEnemyCardToPlay = (cardIds) => {
  const cardIdsCopy = [...cardIds];
  return cardIdsCopy.sort(sortFunc)[0];
};
