import { createNewCard } from '../../cards/createNewCard';

export const genUpgradedCard = (card, upgrade, cardIdOverride) => {
  if (
    !card
    || (card.prefix && card.suffix)
    || (card.pierces && upgrade.pierces)
    || (card.dealsBanishingDamage && upgrade.dealsBanishingDamage)
    || (card.banishesOnPlay && upgrade.banishesOnPlay)
    || (card.triggerDiscardOnPlay && upgrade.triggerDiscardOnPlay)
    || (card.intrinsic && upgrade.intrinsic)
    || (card.drain && upgrade.drain)
  ) {
    return null;
  }

  const c = {};
  c.name = card.name;
  c.image = card.image;
  c.rarity = card.rarity;
  c.attack = card.attack + (upgrade.attack || 0);
  c.defense = card.defense + (upgrade.defense || 0);
  c.heal = card.heal + (upgrade.heal || 0);
  c.healEnemy = card.healEnemy + (upgrade.healEnemy || 0);
  c.drain = card.drain || !!upgrade.drain;
  // onDiscard (currently no non-legendary attacks or magic attacks have onDiscard)
  c.type = upgrade.type || card.type;
  c.customDescription = [
    card.customDescription,
    upgrade.customDescription
  ].filter(Boolean).join(' ');
  c.damageSelf = card.damageSelf + (upgrade.damageSelf || 0);
  c.dealsBanishingDamage = card.dealsBanishingDamage || !!upgrade.dealsBanishingDamage;
  c.banishesOnPlay = card.banishesOnPlay || !!upgrade.banishesOnPlay;
  c.triggerDiscardOnPlay = card.triggerDiscardOnPlay || !!upgrade.triggerDiscardOnPlay;
  c.customEffect = card.customEffect; // is this going to work? need testing with magic scroll
  c.pierces = card.pierces || !!upgrade.pierces;
  [
    'playCopiesOfCards',
    'shuffleCardCopiesIntoYourPiles',
    'shuffleCardCopiesIntoOpponentsPiles'
  ].forEach(key => {
    c[key] = [...card[key], ...(upgrade[key] || [])];
  });
  // statBonuses (currently no non-legendary attacks or magic attacks have statBonuses)
  c.prefix = card.prefix || upgrade.prefix;
  c.suffix = card.prefix ? upgrade.suffix : '';
  c.intrinsic = card.intrinsic || !!upgrade.intrinsic;
  c.tags = card.tags;
  if (upgrade.prefix === 'Frosty' && !c.tags['frost']) {
    c.tags['frost'] = true;
  }
  if (upgrade.prefix === 'Burninating' && !c.tags['fire']) {
    c.tags['fire'] = true;
  }

  return createNewCard(c, cardIdOverride);
};
