import { range, sample, shuffle } from 'lodash';
import { blueprints } from '../cards/blueprints';

const commonAttacks = blueprints.lootableCardsByRarity.common.filter(
  i => i.type === 'attack'
);

const deckSizeByDay = {
  1: 20,
  2: 25,
  3: 30, // elite
  4: 35,
  5: 40,
  6: 45, // elite
  7: 50,
  8: 55,
  9: 60, // elite
  10: 75 // final boss
};

export const genMonsterDeck = (monster, day) => {
  const { deck, wave2AdditionalCards = [], eliteAdditionalCards = [], autofill = true } = monster;
  let result = [...deck];

  if ([2, 3, 5, 6, 8, 9].includes(day)) {
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
