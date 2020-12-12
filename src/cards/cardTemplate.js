export const cardTemplate = {
  name: '',
  image: '',
  rarity: '',
  attack: 0,
  defense: 0,
  heal: 0,
  healEnemy: 0,
  drain: false,
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
  statBonuses: null,
  prefix: '', // upgrade prefix
  suffix: '', // upgrade suffix
  battleMutatedProperties: { attack: false, defense: false }, // green text for cards upgraded in battle
  intrinsic: false, // starts in hand, otherwise top of deck
  tags: {}
};
