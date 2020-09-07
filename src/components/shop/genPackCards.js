import { lootableCardPool } from '../../cards/cards';
import { upgradeRarity } from '../../cards/rarity';
import { sample } from 'lodash';

export const genPackCards = (pack) => {
  const { cards } = pack;
  const packCards = [];

  Object.keys(cards).forEach(rarity => {
    for (let i = 0; i < cards[rarity]; i++) {
      packCards.unshift(sample(lootableCardPool[rarity]));
    }
  });

  for (let i = 0; i < packCards.length; i++) {
    if (Math.random() < 0.1) {
      packCards[i] = sample(lootableCardPool[upgradeRarity(packCards[i].rarity)]);
      i--;
    }
  }

  return packCards;
};
