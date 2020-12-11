export const characters = [
  // {
  //   name: 'Paladin',
  //   image: 'paladin',
  //   startingCards: ['Paladin', 'Healing Blade', 'Longsword']
  // },
  // {
  //   name: 'Alchemist',
  //   image: 'alchemist',
  //   startingCards: ['Alchemist', 'Healing Potion', 'Defense Potion']
  // },
  // {
  //   name: 'Mage',
  //   image: 'mage',
  //   startingCards: ['Mage', 'Candy Corn', 'Frost']
  // },
  {
    name: 'Vampire',
    image: 'vampire',
    startingCards: ['Vampire', 'Orc Blade', 'Tentacles'],
    specialAbility: {
      name: 'Drain Shields',
      description: 'Drain the enemy\'s shields to 0, and gain that much for yourself.',
      uses: 2
    }
  },
  // {
  //   name: 'Elementalist',
  //   image: 'cryopyromancer',
  //   startingCards: ['Elementalist', 'Super Frost', 'Fire']
  // },
  // {
  //   name: 'Warlock',
  //   image: 'crazy_mage',
  //   startingCards: ['Warlock', 'Super Fire', 'Super Fire']
  // },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    startingCards: ['Ice Whelp', 'Super Frost', 'Frost'],
    specialAbility: {
      name: 'Mischief',
      description: 'Steal the top card of the enemy\'s discard pile, and add it to your deck, permanently.',
      uses: 1
    }
  },
  {
    name: 'Rogue',
    image: 'rogue',
    startingCards: ['Ice Whelp', 'Longsword', 'Cutlass'],
    specialAbility: {
      name: 'Knife',
      description: 'Play a 2/2 attack card. (This does not take up your turn.)',
      uses: 3
    }
  },
  // {
  //   name: 'Brawler',
  //   image: 'brawler',
  //   startingCards: ['Brawler', 'Greataxe', 'Mace']
  // },
];
