const cardTemplate = {
  name: '',
  image: '',
  rarity: '',
  attack: null,
  defense: null,
  heal: null,
  healEnemy: null,
  onDiscard: null,
  type: '',
  description: '',
  damageSelf: null,
  isMockCard: false, // "pseudo" card for discard effects, etc.
  dealsBanishingDamage: false,
  banishesOnPlay: false,
  customEffect: false,
  pierces: false,
  isToken: false,
  playCopiesOfCards: null,
  shuffleCardCopiesIntoYourPiles: null,
  shuffleCardCopiesIntoOpponentsPiles: null,
  statBonuses: null
};

const genCardDescription = ({
  heal,
  healEnemy,
  damageSelf,
  pierces,
  description,
  onDiscard,
  type,
  dealsBanishingDamage
}) => description || [
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  pierces && `Damage dealt pierces shields.`,
  onDiscard && type !== 'potion' && `On discard: ${genCardDescription(onDiscard)}`,
  dealsBanishingDamage && 'Damage dealt banishes.'
].filter(Boolean).join(' ');

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties,
    description: genCardDescription(properties)
  };

  return card;
};
