import { createCard } from './createCard';

export const potions = [
  {
    name: 'Minor Healing Potion',
    image: 'minor_healing_potion',
    rarity: 'common',
    onDiscard: {
      heal: 2
    }
  },
  {
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    onDiscard: {
      heal: 3
    }
  },
  {
    name: 'Bomb',
    image: 'bomb',
    rarity: 'common',
    isToken: true,
    onDiscard: {
      damageSelf: 2
    }
  },
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    isToken: true,
    onDiscard: {
      damageSelf: 1
    }
  },
  {
    name: 'Freeze',
    image: 'freeze',
    rarity: 'common',
    isToken: true
  },
  {
    name: 'Jello Slime',
    image: 'slime_potion',
    rarity: 'uncommon',
    onDiscard: {
      customEffect: true
    },
    customDescription: 'Shuffle 3 random common or uncommon cards into your deck.'
  },
  {
    name: 'Attack Potion',
    image: 'attack_potion',
    rarity: 'rare',
    onDiscard: {
      statBonuses: { attack: 1 }
    },
    customDescription: 'Gain +1 attack for the rest of the battle.'
  },
  {
    name: 'Magic Potion',
    image: 'magic_potion',
    rarity: 'rare',
    onDiscard: {
      statBonuses: { magic: 1 }
    },
    customDescription: 'Gain +1 magic for the rest of the battle.'
  },
  {
    name: 'Defense Potion',
    image: 'defense_potion',
    rarity: 'rare',
    onDiscard: {
      statBonuses: { defense: 1 }
    },
    customDescription: 'Gain +1 defense for the rest of the battle.'
  },
  {
    name: 'Golden Goblet',
    image: 'golden_goblet',
    rarity: 'legendary',
    onDiscard: {
      customEffect: true,
    },
    customDescription: 'Shuffle 5 cards from your banish into your discard. Heal 5.'
  }
].map(card => createCard({
  ...card,
  type: 'potion',
  banishesOnPlay: true,
  triggerDiscardOnPlay: true
}));
