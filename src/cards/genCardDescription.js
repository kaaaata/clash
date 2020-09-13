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
  pierces && `Damage dealt pierces.`,
  dealsBanishingDamage && 'Damage dealt banishes.',
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  onDiscard && (
    `On ${triggerDiscardOnPlay ? 'play or ' : ''}discard: ${genCardDescription(onDiscard)}`
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
