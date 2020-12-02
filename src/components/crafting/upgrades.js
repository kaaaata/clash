import { flatten } from 'lodash';

const _upgrades = [
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
    description: 'Damage banishes.',
    cardProperties: {
      prefix: 'Banishing',
      suffix: 'of Banishing',
      dealsBanishingDamage: true
    }
  },
  {
    description: 'Damage pierces shields.',
    cardProperties: {
      prefix: 'Piercing',
      suffix: 'of Piercing',
      type: 'magic',
      pierces: true
    }
  },
  {
    description: 'Play a copy of Frost.',
    cardProperties: {
      prefix: 'Frosty',
      suffix: 'of Frost',
      playCopiesOfCards: ['Frost'],
    }
  },
  {
    description: 'Play a copy of Saber.',
    cardProperties: {
      prefix: 'Fencer\'s',
      suffix: 'of Fencing',
      playCopiesOfCards: ['Saber'],
    }
  },
  {
    description: 'Shuffle a copy of Burn into your opponent\'s deck.',
    cardProperties: {
      prefix: 'Burninating',
      suffix: 'of Burninating',
      shuffleCardCopiesIntoOpponentsPiles: [{ cardName: 'Burn', pile: 'deck' }],
    }
  },
  {
    description: 'Heal 1 for each point of damage dealt.',
    cardProperties: {
      prefix: 'Vampire\'s',
      suffix: 'of the Vampire',
      drain: true
    }
  },
  {
    description: 'Starts in your hand.',
    cardProperties: {
      prefix: 'Intrinsic',
      suffix: 'of Intrinsicality',
      intrinsic: true
    }
  }
];

export const upgrades = flatten(_upgrades.map(i => [
  { ...i, cardProperties: { ...i.cardProperties, prefix: null } },
  { ...i, cardProperties: { ...i.cardProperties, suffix: null } },
]));
