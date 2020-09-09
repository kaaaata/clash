import { cards } from '../../cards/cards';
import { createCard } from '../../cards/createCard';

export const genUpgradedCard = (card, upgrade) => {
  if (
    !card
    || (card.pierces && upgrade.pierces)
    || (card.dealsBanishingDamage && upgrade.dealsBanishingDamage)
    || (card.banishesOnPlay && upgrade.banishesOnPlay)
    || (card.triggerDiscardOnPlay && upgrade.triggerDiscardOnPlay)
  ) {
    return null;
  }

  let result;

  const c = {};
  c.name = `${upgrade.prefix || ''}${card.name}${upgrade.suffix || ''}`;
  c.image = card.image;
  c.imageSlant = card.imageSlant;
  c.isCraftable = card.isCraftable;
  c.rarity = card.rarity;
  c.attack = card.attack + upgrade.attack;
  c.defense = card.defense + upgrade.defense;
  c.heal = card.heal + upgrade.heal;
  c.healEnemy = card.healEnemy + upgrade.healEnemy;
  // onDiscard (currently no non-legendary attacks or magic attacks have onDiscard)
  c.type = upgrade.type || card.type;
  c.customDescription = [
    card.customDescription,
    upgrade.customDescription
  ].filter(Boolean).join(' ');
  c.damageSelf = card.damageSelf + upgrade.damageSelf;
  c.dealsBanishingDamage = card.dealsBanishingDamage || upgrade.dealsBanishingDamage;
  c.banishesOnPlay = card.banishesOnPlay || upgrade.banishesOnPlay;
  c.triggerDiscardOnPlay = card.triggerDiscardOnPlay || upgrade.triggerDiscardOnPlay;
  c.customEffect = card.customEffect; // is this going to work? need testing with magic scroll
  c.pierces = card.pierces || upgrade.pierces;
  [
    'playCopiesOfCards',
    'shuffleCardCopiesIntoYourPiles',
    'shuffleCardCopiesIntoOpponentsPiles'
  ].forEach(key => {
    c[key] = [...card[key], ...upgrade[key]];
  });
  // statBonuses (currently no non-legendary attacks or magic attacks have statBonuses)

  result = createCard(c);

  cards[result.name] = result;
  
  return result;
};
