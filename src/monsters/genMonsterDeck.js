import { range, sample, shuffle } from 'lodash';
import { blueprints } from '../cards/blueprints';

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

export const genMonsterDeck = (deck, day) => {
  const deckByRarity = deck.map(cardName => blueprints.allCardsObject[cardName].rarity);
  const { maxLegendaries, maxRares, maxUncommons, deckSize } = dayBalancing[day];
  const cardsToAdd = {
    legendary: Math.max(0, maxLegendaries - deckByRarity.filter(card => card.rarity === 'legendary').length),
    rare: Math.max(0, maxRares - deckByRarity.filter(card => card.rarity === 'rare').length),
    uncommon: Math.max(0, maxUncommons - deckByRarity.filter(card => card.rarity === 'uncommon').length),
  };
  cardsToAdd.common = Math.max(0, deckSize
    - cardsToAdd.legendary
    - cardsToAdd.rare
    - cardsToAdd.uncommon
    - deck.length
  );

  return shuffle([
    ...deck,
    ...range(0, cardsToAdd.legendary).map(
      i => sample(blueprints.lootableCardsByRarity.legendary).name
    ),
    ...range(0, cardsToAdd.rare).map(
      i => sample(blueprints.lootableCardsByRarity.rare).name
    ),
    ...range(0, cardsToAdd.uncommon).map(
      i => sample(blueprints.lootableCardsByRarity.uncommon).name
    ),
    ...range(0, cardsToAdd.common).map(
      i => sample(blueprints.lootableCardsByRarity.common).name
    )
  ]);
};
