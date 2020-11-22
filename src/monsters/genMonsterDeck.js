import { range, sample, shuffle } from 'lodash';
import { blueprints } from '../cards/blueprints';

// general monster deck balancing by day
/*
const dayBalancing = {
  1: { deckSize: 10, maxLegendaries: 0, maxRares: 0, maxUncommons: 0 },
  2: { deckSize: 15, maxLegendaries: 0, maxRares: 0, maxUncommons: 1 },
  3: { deckSize: 20, maxLegendaries: 0, maxRares: 0, maxUncommons: 2 }, // elite
  4: { deckSize: 25, maxLegendaries: 0, maxRares: 1, maxUncommons: 3 },
  5: { deckSize: 30, maxLegendaries: 0, maxRares: 1, maxUncommons: 4 },
  6: { deckSize: 35, maxLegendaries: 0, maxRares: 1, maxUncommons: 5 }, // elite
  7: { deckSize: 40, maxLegendaries: 1, maxRares: 2, maxUncommons: 6 },
  8: { deckSize: 45, maxLegendaries: 1, maxRares: 2, maxUncommons: 7 },
  9: { deckSize: 50, maxLegendaries: 1, maxRares: 2, maxUncommons: 8 }, // elite
  10: { deckSize: 60, maxLegendaries: 2, maxRares: 3, maxUncommons: 9 } // final boss
};
*/

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
  const { deck, wave2AdditionalCards, eliteAdditionalCards, autofill = true } = monster;
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
