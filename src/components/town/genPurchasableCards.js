import { attacks } from '../../cards/attacks';
import { magic } from '../../cards/magic';
import { potions } from '../../cards/potions';
import { allies } from '../../cards/allies';
import { sample, random } from 'lodash';

const cards = {
  attacks: attacks.filter(card => !card.isToken && card.rarity !== 'special'),
  magic: magic.filter(card => !card.isToken && card.rarity !== 'special'),
  potions: potions.filter(card => !card.isToken && card.rarity !== 'special'),
  allies: allies.filter(card => !card.isToken && card.rarity !== 'special')
};

export const genPurchasableCards = (type) => {
  const rolledLegendaryCard = Math.random() < 0.1;

  const purchasableCards = [
    {
      name: (sample(cards[type].filter(card => card.rarity === 'common')) || {}).name,
      cost: 10 + random(-5, 5)
    },
    {
      // magic vendor sells an extra common, to compensate for there being no rare magic card.
      name: type === 'magic' && !rolledLegendaryCard && (
        sample(cards[type].filter(card => card.rarity === 'common')) || {}
      ).name,
      cost: 10 + random(-5, 5)
    },
    {
      name: (sample(cards[type].filter(card => card.rarity === 'uncommon')) || {}).name,
      cost: 30 + random(-10, 10)
    }
  ];

  if (rolledLegendaryCard) {
    purchasableCards.push({
      name: (sample(cards[type].filter(card => card.rarity === 'legendary')) || {}).name,
      cost: 120 + random(-30, 30)
    });
  } else {
    purchasableCards.push({
      name: (sample(cards[type].filter(card => card.rarity === 'rare')) || {}).name,
      cost: 70 + random(-20, 20)
    });
  }

  

  return purchasableCards.filter(card => card.name);
};
