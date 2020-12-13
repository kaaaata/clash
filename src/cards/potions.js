import { cardTemplate } from './cardTemplate';
import { genCardDescription } from './genCardDescription';

export const potions = [
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    isToken: true,
    onDiscard: {
      damageSelf: 2,
      pierces: true
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
    name: 'Vial of Acid',
    image: 'acid_potion',
    rarity: 'uncommon',
    customDescription: 'Deal 3 damage to the enemy.',
    onDiscard: {
      attack: 3,
      pierces: true
    }
  },
  {
    name: 'Viking Slime',
    image: 'slime_potion',
    rarity: 'uncommon',
    onDiscard: {
      customEffect: true
    },
    customDescription: 'Shuffle 3 random common or uncommon attack cards into your deck.'
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
].map(card => {
  card.type = 'potion';
  card.banishesOnPlay = true;
  card.triggerDiscardOnPlay = true;

  return {
    ...cardTemplate,
    ...card,
    description: genCardDescription(card)
  };
});
