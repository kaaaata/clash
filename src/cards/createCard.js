const cardTemplate = {
  name: '',
  image: '',
  imageSlant: 0, // 0 = SW -> NE, 1 = NW -> SE
  craftedImage: '',
  craftedImageSlant: 0,
  isCraftable: false, // can the card be used in crafting?
  glow: null,
  rarity: '',
  attack: 0,
  defense: 0,
  heal: 0,
  healEnemy: 0,
  onDiscard: null,
  type: '',
  description: '', // procedurally generated. may include customDescription at the end.
  customDescription: '', // manually generated
  damageSelf: 0,
  isMockCard: false, // "pseudo" card for discard effects, etc.
  dealsBanishingDamage: false,
  banishesOnPlay: false,
  triggerDiscardOnPlay: false,
  customEffect: false,
  pierces: false,
  isToken: false,
  playCopiesOfCards: [],
  shuffleCardCopiesIntoYourPiles: [],
  shuffleCardCopiesIntoOpponentsPiles: [],
  statBonuses: null
};

const genCardDescription = ({
  heal,
  healEnemy,
  damageSelf,
  pierces,
  onDiscard,
  triggerDiscardOnPlay,
  type,
  dealsBanishingDamage,
  customDescription
}) => [
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  pierces && `Damage dealt pierces.`,
  onDiscard && type !== 'potion' && (
    `On ${triggerDiscardOnPlay ? 'play or ' : ''}discard: ${genCardDescription(onDiscard)}`
  ),
  dealsBanishingDamage && 'Damage dealt banishes.',
  customDescription
].filter(Boolean).join(' ');

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties,
    description: genCardDescription(properties)
  };

  return card;
};
