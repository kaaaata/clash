import { colors } from "../styles";

export const characters = [
  {
    name: 'Paladin',
    image: 'paladin',
    startingCards: ['Paladin', 'Healing Blade', 'Healing Blade'],
    specialAbility: {
      name: 'Super Heal',
      description: 'Heal 3. Each card healed this way gets +1/+1.',
      uses: 2,
      color: colors.green
    }
  },
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
      uses: 2,
      color: colors.black
    }
  },
  {
    name: 'Elementalist',
    image: 'cryopyromancer',
    startingCards: ['Elementalist', 'Super Fire', 'Frost'],
    specialAbility: {
      name: 'Invoke',
      description: 'Give +1/+1 to all Fire or Frost cards in your hand, alternating with each use.',
      uses: 4,
      color: null // changes programmatically with each use
    }
  },
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
      uses: 1,
      color: colors.violet
    }
  },
  {
    name: 'Rogue',
    image: 'rogue',
    startingCards: ['Ice Whelp', 'Longsword', 'Cutlass'],
    specialAbility: {
      name: 'Knife',
      description: 'Play a 2/2 attack card. (This does not take up your turn.)',
      uses: 2,
      color: colors.steel
    }
  },
  // {
  //   name: 'Brawler',
  //   image: 'brawler',
  //   startingCards: ['Brawler', 'Greataxe', 'Mace']
  // },
];
