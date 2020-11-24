import { cardTemplate } from './cardTemplate';
import { genCardDescription } from './genCardDescription';

export const allies = [
  {
    name: 'Swordsman',
    image: 'soldier',
    rarity: 'common',
    attack: 4,
    defense: 0
  },
  {
    name: 'Spearman',
    image: 'red_spear_guy',
    rarity: 'common',
    attack: 3,
    defense: 2
  },
  {
    name: 'Mimic',
    image: 'mimic',
    rarity: 'common',
    attack: 1,
    defense: 1,
    playCopiesOfCards: ['Tentacles']
  },
  {
    name: 'Recruiter',
    image: 'shop_girl',
    rarity: 'common',
    attack: 0,
    defense: 2,
    customEffect: true,
    customDescription: 'Play a random ally from your discard pile, then banish it.'
  },
  {
    name: 'Paladin',
    image: 'paladin',
    rarity: 'common',
    attack: 2,
    defense: 2,
    shuffleCardCopiesIntoYourPiles: [{ cardName: 'Healing Blade', pile: 'deck' }]
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 5,
    healEnemy: 1
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    rarity: 'uncommon',
    attack: 1,
    defense: 1,
    playCopiesOfCards: ['Frost']
  },
  {
    name: 'Lich',
    image: 'lich',
    rarity: 'uncommon',
    attack: 1,
    defense: 4,
    customEffect: true,
    customDescription: 'Shuffle 2 random allies from your discard pile into your deck. They get +2/+2.'
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    rarity: 'uncommon',
    attack: 2,
    defense: 0,
    playCopiesOfCards: ['Falchion']
  },
  {
    name: 'Evil Slime',
    image: 'evil_slime',
    rarity: 'uncommon',
    attack: 4,
    defense: 0,
    shuffleCardCopiesIntoYourPiles: [
      { cardName: 'Greataxe', pile: 'deck' },
      { cardName: 'Blank', pile: 'deck' },
      { cardName: 'Blank', pile: 'deck' },
    ]
  },
  {
    name: 'Brawler',
    image: 'brawler',
    rarity: 'uncommon',
    attack: 4,
    defense: 2,
    customEffect: true,
    customDescription: 'Shuffle a copy of a random non-legendary attack into your deck.'
  },
  {
    name: 'Apothecary',
    image: 'alchemist',
    rarity: 'uncommon',
    attack: 0,
    defense: 3,
    onDiscard: {
      customEffect: true
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Shuffle a random potion from your banish into your deck.'
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    rarity: 'rare',
    attack: 2,
    defense: 0,
    playCopiesOfCards: ['Fire', 'Fire']
  },
  {
    name: 'Minotaur',
    image: 'minotaur',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    customEffect: true,
    customDescription: 'Play 2 random attacks from your discard, then banish them.'
  },
  {
    name: 'Water Slime',
    image: 'water_slime',
    rarity: 'rare',
    attack: 5,
    defense: 1,
    drain: true
  },
  {
    name: 'Mage',
    image: 'mage',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    customEffect: true,
    customDescription: 'Play 2 random magic attacks from your discard, then banish them.'
  },
  {
    name: 'Vampire',
    image: 'vampire',
    rarity: 'rare',
    attack: 6,
    defense: 2,
    damageSelf: 1,
    banishes: true,
    dealsBanishingDamage: true
  },
  {
    name: 'Elementalist',
    image: 'cryopyromancer',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { cardName: 'Burn', pile: 'deck' },
      { cardName: 'Burn', pile: 'deck' },
    ],
    playCopiesOfCards: ['Super Frost']
  },
  {
    name: 'Fire Dragon',
    image: 'fire_dragon',
    rarity: 'legendary',
    attack: 6,
    defense: 6,
    onDiscard: {
      playCopiesOfCards: ['Super Fire']
    },
    triggerDiscardOnPlay: true
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    rarity: 'legendary',
    attack: 5,
    defense: 7,
    onDiscard: {
      playCopiesOfCards: ['Healing Blade']
    },
    triggerDiscardOnPlay: true
  },
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    rarity: 'legendary',
    attack: 4,
    defense: 8,
    onDiscard: {
      playCopiesOfCards: ['Ice Blade']
    },
    triggerDiscardOnPlay: true
  }
].map(card => {
  card.type = 'ally';

  return {
    ...cardTemplate,
    ...card,
    description: genCardDescription(card)
  };
});
