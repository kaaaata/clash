import { omit } from 'lodash';

const genPlayCopiesOfCardsDescription = (playCopiesOfCards) => {
  const copyCounts = {};
  playCopiesOfCards.forEach(cardName => {
    if (copyCounts[cardName]) {
      copyCounts[cardName]++;
    } else {
      copyCounts[cardName] = 1;
    }
  });

  return Object.keys(copyCounts).map(cardName => (
    `Play ${copyCounts[cardName] === 1 ? 'a copy' : `${copyCounts[cardName]} copies`} of ${cardName}.`
  )).join(' ');
};
// [{ cardName: 'Healing Blade', pile: 'deck' }]
const genShuffleCardCopiesIntoPilesDescription = (shuffleCardCopiesIntoPiles, player) => {
  const copiesObj = {};
  shuffleCardCopiesIntoPiles.forEach(i => {
    const key = `${i.cardName}_${i.pile}`;
    if (copiesObj[key]) {
      copiesObj[key]++;
    } else {
      copiesObj[key] = 1;
    }
  });

  return Object.keys(copiesObj).map(key => {
    const cardName = key.split('_')[0];
    const cardPile = key.split('_')[1];
    return `Shuffle ${copiesObj[key] === 1 ? 'a copy' : `${copiesObj[key]} copies`} of ${cardName} into your ${player === 'you' ? '' : 'opponent\'s '}${cardPile}.`;
  }).join(' ');
};

export const genCardDescription = ({
  heal,
  healEnemy,
  drain,
  damageSelf,
  pierces,
  onDiscard,
  triggerDiscardOnPlay,
  dealsBanishingDamage,
  playCopiesOfCards,
  shuffleCardCopiesIntoYourPiles,
  shuffleCardCopiesIntoOpponentsPiles,
  customDescription
}) => [
  (pierces || (onDiscard && onDiscard.pierces)) && `Damage pierces shields.`,
  dealsBanishingDamage && 'Damage banishes.',
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  drain && `Heal 1 for each point of damage dealt.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  onDiscard && (
    `On ${triggerDiscardOnPlay ? 'play or ' : ''}discard: ${
      genCardDescription(omit(onDiscard, 'pierces'))
    }`
  ),
  playCopiesOfCards && genPlayCopiesOfCardsDescription(playCopiesOfCards),
  shuffleCardCopiesIntoYourPiles && genShuffleCardCopiesIntoPilesDescription(
    shuffleCardCopiesIntoYourPiles,
    'you'
  ),
  shuffleCardCopiesIntoOpponentsPiles && genShuffleCardCopiesIntoPilesDescription(
    shuffleCardCopiesIntoOpponentsPiles,
    'enemy'
  ),
  customDescription
].filter(Boolean).join(' ');
