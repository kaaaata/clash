import { upgradeRarity } from '../../cards/rarity';
import { sample } from 'lodash';
import { blueprints } from '../../cards/blueprints';

export const genPackCardNames = (pack) => {
  const { cards } = pack;
  const packCardNames = [];

  Object.keys(cards).forEach(rarity => {
    for (let i = 0; i < cards[rarity]; i++) {
      packCardNames.unshift(sample(blueprints.lootableCardsByRarity[rarity]).name);
    }
  });

  for (let i = 0; i < packCardNames.length; i++) {
    if (Math.random() < 0.1) {
      packCardNames[i] = sample(
        blueprints.lootableCardsByRarity[upgradeRarity(packCardNames[i].rarity)]
      ).name;

      // to allow the same card to be upgraded multiple times, enable below line
      // i--;
    }
  }

  return packCardNames;
};
