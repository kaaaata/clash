import { createNewCard } from '../../cards/createNewCard';

export const genUpgradedCard = (card, upgrade, cardIdOverride) => {
  if (
    !card
    || (card.prefix && upgrade.prefix)
    || (card.suffix && upgrade.sufix)
    || (card.pierces && upgrade.pierces)
    || (card.dealsBanishingDamage && upgrade.dealsBanishingDamage)
    || (card.banishesOnPlay && upgrade.banishesOnPlay)
    || (card.triggerDiscardOnPlay && upgrade.triggerDiscardOnPlay)
  ) {
    return null;
  }

  const c = {};
  c.name = `${upgrade.prefix || ''} ${card.name} ${upgrade.suffix || ''}`.trim();
  c.image = card.image;
  c.imageSlant = card.imageSlant;
  c.isCraftable = card.isCraftable;
  c.rarity = card.rarity;
  c.attack = card.attack + (upgrade.attack || 0);
  c.defense = card.defense + (upgrade.defense || 0);
  c.heal = card.heal + (upgrade.heal || 0);
  c.healEnemy = card.healEnemy + (upgrade.healEnemy || 0);
  c.drain = card.drain || upgrade.drain;
  // onDiscard (currently no non-legendary attacks or magic attacks have onDiscard)
  c.type = upgrade.type || card.type;
  c.customDescription = [
    card.customDescription,
    upgrade.customDescription
  ].filter(Boolean).join(' ');
  c.damageSelf = card.damageSelf + (upgrade.damageSelf || 0);
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
    c[key] = [...card[key], ...(upgrade[key] || [])];
  });
  // statBonuses (currently no non-legendary attacks or magic attacks have statBonuses)
  c.prefix = card.prefix || upgrade.prefix;
  c.suffix = card.suffix || upgrade.suffix;
  
  return createNewCard(c, cardIdOverride);
};
