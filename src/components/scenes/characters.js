import { colors } from "../styles";

export const characters = [
  {
    name: 'Paladin',
    image: 'paladin',
    startingCards: ['Paladin', 'Healing Blade', 'Healing Blade'],
    specialAbility: {
      name: 'Healing Touch',
      description: 'Heal 2. Each card healed this way gets +1/+1.',
      uses: 2,
      color: colors.green
    }
  },
  {
    name: 'Alchemist',
    image: 'alchemist',
    startingCards: ['Alchemist', 'Healing Potion', 'Vial of Acid'],
    specialAbility: {
      name: 'Fizzle',
      description: 'Transform each card in your hand into a random non-legendary potion.',
      uses: 1,
      color: colors.violet
    }
  },
  {
    name: 'Vampire',
    image: 'vampire',
    startingCards: ['Vampire', 'Vampire Blade', 'Vampire Blade'],
    specialAbility: {
      name: 'Armor Vampire',
      description: 'Drain the enemy\'s shields to 0. Heal 1 for each shield drained.',
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
      color: colors.yellow // changes programmatically with each use
    }
  },
  {
    name: 'Knight',
    image: 'knight',
    startingCards: ['Knight', 'Orc Blade', 'Lotus'],
    specialAbility: {
      name: 'Heavy Strike',
      description: 'Gain 2 shields. Play a random attack card from your hand with +2/+0.',
      uses: 2,
      color: colors.red
    }
  },
  {
    name: 'Assassin',
    image: 'rogue',
    startingCards: ['Assassin', 'Attack Potion', 'Multishot'],
    specialAbility: {
      name: 'Knife',
      description: 'Play a 2/2 attack card. (This does not take up your turn.)',
      uses: 2,
      color: colors.steel
    }
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    startingCards: ['Ice Whelp', 'Super Frost', 'Magic Scroll'],
    specialAbility: {
      name: 'Mischief',
      description: 'Steal the top card of the enemy\'s discard pile, and add it to your deck, permanently.',
      uses: 1,
      color: colors.blue
    }
  }
];
