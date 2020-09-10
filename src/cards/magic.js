export const magic = [
  {
    name: 'Fire',
    image: 'fire',
    rarity: 'common',
    attack: 1,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' }
    ],
    customDescription: 'Shuffle a copy of Burn into your opponent\'s deck.'
  },
  {
    name: 'Frost',
    image: 'frost',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Tentacles',
    image: 'tentacles',
    rarity: 'common',
    attack: 2,
    defense: 1
  },
  {
    name: 'Magic Scroll',
    image: 'scroll',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    customEffect: true,
    customDescription: 'Play a copy of a random non-legendary card.'
  },
  {
    name: 'Candy Corn',
    image: 'candy_corn',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    shuffleCardCopiesIntoYourPiles: [
      { cardName: 'Candy Corn', pile: 'discard', index: 'top' },
      { cardName: 'Candy Corn', pile: 'discard', index: 'top' }
    ],
    customDescription: 'Add two copies of Candy Corn into your discard.'
  },
  {
    name: 'Super Fire',
    image: 'double_fireball',
    rarity: 'uncommon',
    attack: 2,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' },
      { card: 'Burn', pile: 'deck' },
    ],
    customDescription: 'Shuffle 2 copies of Burn into your opponent\'s deck.'
  },
  {
    name: 'Super Frost',
    image: 'double_frost',
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  },
  {
    name: 'Tome of Spells',
    image: 'book',
    rarity: 'legendary',
    attack: 2,
    defense: 4,
    onDiscard: {
      customEffect: true
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Shuffle 4 random non-legendary magic attacks into your deck.'
  }
];

magic.forEach(card => {
  card.type = 'magic';
  card.pierces = true;
  card.isCraftable = card.rarity !== 'legendary' && !card.isToken;
});
