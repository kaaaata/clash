import { createCard } from './createCard';

export const magic = [
  {
    name: 'Fire',
    image: 'fire',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Frost',
    image: 'frost',
    rarity: 'common',
    attack: 1,
    defense: 1,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Freeze', pile: 'deck' }
    ],
    description: 'Damage dealt pierces shields. Shuffle a copy of Freeze into your opponent\'s deck.'
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
    description: 'Play a copy of a random non-legendary card.'
  },
  {
    name: 'Candy Corn',
    image: 'candy_corn',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Candy Corn', pile: 'discard', index: 'top' },
      { card: 'Candy Corn', pile: 'discard', index: 'top' }
    ],
    description: 'Damage dealt pierces shields. Add two copies of Candy Corn into your discard.'
  },
  {
    name: 'Super Fire',
    image: 'double_fireball',
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  },
  {
    name: 'Super Frost',
    image: 'double_frost',
    rarity: 'uncommon',
    attack: 2,
    defense: 2,
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Freeze', pile: 'deck' },
      { card: 'Freeze', pile: 'deck' }
    ]
  },
  {
    name: 'Tome of Spells',
    image: 'book',
    rarity: 'legendary',
    attack: 2,
    defense: 4,
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    description: 'Damage dealt pierces shields. When played or discarded, shuffle 4 random magic attacks into your deck.'
  }
].map(card => createCard({
  ...card,
  type: 'magic',
  pierces: true
}));
