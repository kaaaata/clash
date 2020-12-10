import { cardTemplate } from './cardTemplate';
import { genCardDescription } from './genCardDescription';

export const attacks = [
  {
    name: 'Blank',
    image: 'blank',
    rarity: 'common',
    isToken: true,
    customDescription: 'This card does nothing!'
  },
  {
    name: 'Sword',
    image: 'strike',
    rarity: 'common',
    attack: 3,
    defense: 0
  },
  {
    name: 'Cutlass',
    image: 'slash',
    rarity: 'common',
    attack: 3,
    defense: 1
  },
  {
    name: 'Mace',
    image: 'crush',
    rarity: 'common',
    attack: 2,
    defense: 0
  },
  {
    name: 'Saber',
    image: 'parry',
    rarity: 'common',
    attack: 2,
    defense: 1
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
    attack: 4,
    defense: 0,
    dealsBanishingDamage: true
  },
  {
    name: 'Falchion',
    image: 'slice',
    rarity: 'uncommon',
    attack: 5,
    defense: 0
  },
  {
    name: 'Longsword',
    image: 'two_handed_strike',
    rarity: 'uncommon',
    attack: 5,
    defense: 1
  },
  {
    name: 'Fire Spear',
    image: 'fire_spear',
    rarity: 'uncommon',
    attack: 3,
    defense: 0,
    playCopiesOfCards: ['Fire']
  },
  {
    name: 'Multishot',
    image: 'multishot',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow']
  },
  {
    name: 'Shield',
    image: 'block',
    rarity: 'uncommon',
    attack: 2,
    defense: 5
  },
  {
    name: 'Lotus',
    image: 'lotus',
    rarity: 'uncommon',
    attack: 4,
    defense: 3
  },
  {
    name: 'Greataxe',
    image: 'sunder',
    rarity: 'rare',
    attack: 7,
    defense: 0
  },
  {
    name: 'Gladius',
    image: 'darksteel_sword',
    rarity: 'rare',
    attack: 6,
    defense: 1,
    dealsBanishingDamage: true
  },
  {
    name: 'Healing Blade',
    image: 'healing_blade',
    rarity: 'rare',
    attack: 4,
    defense: 1,
    heal: 3
  },
  {
    name: 'Ice Blade',
    image: 'ice_sword',
    rarity: 'rare',
    attack: 4,
    defense: 4,
    shuffleCardCopiesIntoYourPiles: [
      { cardName: 'Super Frost', pile: 'deck' }
    ]
  },
  {
    name: 'Forest Bow',
    image: 'green_bow',
    rarity: 'legendary',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow', 'Arrow'],
    statBonuses: { attack: 1 },
    customDescription: 'Gain +1 strength for the rest of the battle.'
  },
  {
    name: 'Dragon Blade',
    image: 'dragon_blade',
    rarity: 'legendary',
    attack: 7,
    defense: 7,
    dealsBanishingDamage: true
  }
].map(card => {
  card.type = 'attack';

  return {
    ...cardTemplate,
    ...card,
    description: genCardDescription(card)
  };
});
