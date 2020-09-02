import { createCard } from './createCard';

export const attacks = [
  {
    name: 'Strange Key',
    image: 'key',
    rarity: 'common',
    attack: 2,
    defense: 0,
    isToken: true,
    description: 'Maybe this unlocks something....'
  },
  {
    name: 'Sword',
    image: 'strike',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Cutlass',
    image: 'slash',
    rarity: 'common',
    attack: 2,
    defense: 1
  },
  {
    name: 'Mace',
    image: 'crush',
    rarity: 'common',
    attack: 3,
    defense: 0
  },
  {
    name: 'Saber',
    image: 'parry',
    rarity: 'common',
    attack: 1,
    defense: 2
  },
  {
    name: 'Arrow',
    image: 'arrow',
    rarity: 'common',
    attack: 2,
    defense: 0,
    isToken: true
  },
  {
    name: 'Orc Blade',
    image: 'piercing_blow',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    dealsBanishingDamage: true
  },
  {
    name: 'Falchion',
    image: 'slice',
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  },
  {
    name: 'Longsword',
    image: 'two_handed_strike',
    rarity: 'uncommon',
    attack: 4,
    defense: 1
  },
  {
    name: 'Fire Spear',
    image: 'fire_spear',
    rarity: 'uncommon',
    attack: 2,
    defense: 1,
    playCopiesOfCards: ['Fire'],
    description: 'Play a copy of Fire.'
  },
  {
    name: 'Multishot',
    image: 'multishot',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow'],
    description: 'Play two copies of Arrow.'
  },
  {
    name: 'Shield',
    image: 'block',
    rarity: 'uncommon',
    attack: 1,
    defense: 4
  },
  {
    name: 'Lotus',
    image: 'lotus',
    rarity: 'uncommon',
    attack: 3,
    defense: 2
  },
  {
    name: 'Greataxe',
    image: 'sunder',
    rarity: 'rare',
    attack: 5,
    defense: 0
  },
  {
    name: 'Gladius',
    image: 'darksteel_sword',
    rarity: 'rare',
    attack: 4,
    defense: 1,
    dealsBanishingDamage: true
  },
  {
    name: 'Healing Blade',
    image: 'fat_blue_sword',
    rarity: 'rare',
    attack: 3,
    defense: 0,
    heal: 3
  },
  {
    name: 'Ice Blade',
    image: 'ice_sword',
    rarity: 'rare',
    attack: 2,
    defense: 5,
    shuffleCardCopiesIntoOpponentsPiles: [{ card: 'Freeze', pile: 'deck' }],
    description: 'Shuffle a copy of Freeze into your opponent\'s deck.'
  },
  {
    name: 'Forest Bow',
    image: 'green_bow',
    rarity: 'legendary',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow', 'Arrow'],
    statBonuses: { attack: 1 },
    description: 'Play 3 copies of Arrow. Gain +1 attack for the rest of the battle.'
  },
  {
    name: 'Dragon Blade',
    image: 'dragon_blade',
    rarity: 'legendary',
    attack: 6,
    defense: 3,
    dealsBanishingDamage: true
  }
].map(card => createCard({
  ...card,
  type: 'attack'
}));
