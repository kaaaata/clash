import { flatten } from 'lodash';

// const cardTemplate = {
//   name: '',
//   image: '',
//   imageSlant: 0, // 0 = SW -> NE, 1 = NW -> SE
//   craftedImage: '',
//   craftedImageSlant: 0,
//   isCraftable: false, // can the card be used in crafting?
//   glow: null,
//   rarity: '',
//   attack: 0,
//   defense: 0,
//   heal: 0,
//   healEnemy: 0,
//   onDiscard: null,
//   type: '',
//   description: '', // procedurally generated. may include customDescription at the end.
//   customDescription: '', // manually generated
//   damageSelf: 0,
//   isMockCard: false, // "pseudo" card for discard effects, etc.
//   dealsBanishingDamage: false,
//   banishesOnPlay: false,
//   triggerDiscardOnPlay: false,
//   customEffect: false,
//   pierces: false,
//   isToken: false,
//   playCopiesOfCards: [],
//   shuffleCardCopiesIntoYourPiles: [],
//   shuffleCardCopiesIntoOpponentsPiles: [],
//   statBonuses: null,
//   prefix: '', // upgrade prefix
//   suffix: '' // upgrade suffix
// };

const _basicUpgrades = [
  {
    description: '+2 attack.',
    cardProperties: {
      prefix: 'Sharp',
      suffix: 'of Sharpness',
      attack: 2
    }
  },
  {
    description: '+2 defense.',
    cardProperties: {
      prefix: 'Sturdy',
      suffix: 'of Sturdiness',
      defense: 2
    }
  },
  {
    description: '+1 attack and +1 defense.',
    cardProperties: {
      prefix: 'Honed',
      suffix: 'of Honing',
      attack: 1,
      defense: 1
    }
  },
  {
    description: 'Heal 2.',
    cardProperties: {
      prefix: 'Healing',
      suffix: 'of Healing',
      heal: 2
    }
  },
  {
    description: 'Damage dealt banishes.',
    cardProperties: {
      prefix: 'Banishing',
      suffix: 'of Banishing',
      dealsBanishingDamage: true
    }
  },
  {
    description: 'Damage dealt pierces shields.',
    cardProperties: {
      prefix: 'Piercing',
      suffix: 'of Piercing',
      type: 'magic',
      pierces: true
    }
  },
  // {
  //   description: 'Play a copy of Frost',
  //   cardProperties: {
  //     prefix: 'Frosty',
  //     suffix: 'of Frost',
  //     playCopiesOfCards: ['Frost']
  //   }
  // },
];

export const basicUpgrades = flatten(_basicUpgrades.map(i => [
  { ...i, cardProperties: { ...i.cardProperties, prefix: null } },
  { ...i, cardProperties: { ...i.cardProperties, suffix: null } },
]));
