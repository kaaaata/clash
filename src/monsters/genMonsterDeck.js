import { range, sample, shuffle } from 'lodash';
import { blueprints } from '../cards/blueprints';

const commonAttacks = blueprints.lootableCardsByRarity.common.filter(
  i => i.type === 'attack'
);

const deckSizeByDay = {
  1: 15,
  2: 20,
  3: 25, // elite
  4: 30,
  5: 35,
  6: 40, // elite
  7: 45,
  8: 50,
  9: 55, // elite
  10: 60 // final boss
};

export const genMonsterDeck = (monster, day) => {
  const { deck, wave2AdditionalCards = [], eliteAdditionalCards = [], autofill = true } = monster;
  let result = [...deck];

  if ([2, 5, 8].includes(day)) {
    result = result.concat(wave2AdditionalCards);
  }
  if ([3, 6, 9].includes(day)) {
    result = result.concat(eliteAdditionalCards);
  }
  if (autofill) {
    const numCardsToAutofill = Math.max(0, deckSizeByDay[day] - result.length);
    result = result.concat(range(0, numCardsToAutofill).map(i => sample(commonAttacks).name));
  }
  
  return shuffle(result);
};
