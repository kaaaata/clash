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
  1: 10,
  2: 15,
  3: 20, // elite
  4: 25,
  5: 30,
  6: 35, // elite
  7: 40,
  8: 45,
  9: 50, // elite
  10: 60 // final boss
};

export const genMonsterDeck = (deck, day) => {
  const commonCardsToAdd = Math.max(0, deckSizeByDay[day] - deck.length);

  return shuffle([
    ...deck,
    ...range(0, commonCardsToAdd).map(i => sample(commonAttacks).name)
  ]);
};
