import { cardTemplate } from './cardTemplate';
import { genCardDescription } from './genCardDescription';

export const attacks = [
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
    imageSlant: 1,
    rarity: 'common',
    attack: 2,
    defense: 1
  },
  {
    name: 'Mace',
    image: 'crush',
    imageSlant: 1,
    rarity: 'common',
    attack: 3,
    defense: 0
  },
  {
    name: 'Saber',
    image: 'parry',
    imageSlant: 1,
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
    imageSlant: 1,
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  },
  {
    name: 'Longsword',
    image: 'two_handed_strike',
    imageSlant: 1,
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
    imageSlant: 1,
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
    imageSlant: 1,
    rarity: 'rare',
    attack: 3,
    defense: 0,
    heal: 3
  },
  {
    name: 'Ice Blade',
    image: 'ice_sword',
    imageSlant: 1,
    rarity: 'rare',
    attack: 2,
    defense: 5,
    shuffleCardCopiesIntoYourPiles: [
      { cardName: 'Super Frost', pile: 'deck' }
    ]
  },
  {
    name: 'Forest Bow',
    image: 'green_bow',
    imageSlant: 1,
    rarity: 'legendary',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Arrow', 'Arrow', 'Arrow'],
    statBonuses: { attack: 1 },
    customDescription: 'Gain +1 attack for the rest of the battle.'
  },
  {
    name: 'Dragon Blade',
    image: 'dragon_blade',
    imageSlant: 1,
    rarity: 'legendary',
    attack: 6,
    defense: 3,
    dealsBanishingDamage: true
  }
].map(card => {
  card.type = 'attack';
  card.isCraftable = card.rarity !== 'legendary' && !card.isToken;

  return {
    ...cardTemplate,
    ...card,
    description: genCardDescription(card)
  };
});
