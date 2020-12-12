export const upgrades = [
  {
    description: '+2 attack.',
    cardProperties: {
      prefix: 'Lethal',
      suffix: 'of Lethality',
      attack: 2
    }
  },
  {
    description: '+3 defense.',
    cardProperties: {
      prefix: 'Guarding',
      suffix: 'of Guarding',
      defense: 3
    }
  },
  {
    description: '+1 attack and +2 defense.',
    cardProperties: {
      prefix: 'Honed',
      suffix: 'of Honing',
      attack: 1,
      defense: 2
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
