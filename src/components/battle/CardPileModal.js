import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import { cards } from '../../cards/cards';
import { rarityScore } from '../../cards/rarity';
import * as actions from '../../stores/actions';
import { CardViewModal } from '../modals/CardViewModal';

export const CardPileModal = () => {
  const { activeModalCardPile, modalCards, enemyName } = useSelector(state => ({
    activeModalCardPile: state.clashBattleCards.activeModalCardPile,
    modalCards: state.clashBattleCards.activeModalCardPile
      ? state.clashBattleCards[state.clashBattleCards.activeModalCardPile]
      : [],
    enemyName: state.clashBattleStats.enemyName
  }), (oldState, newState) => oldState.activeModalCardPile === newState.activeModalCardPile);
  // only rerender when user clicks pile. cards changing while modal is open don't cause rerender
  const dispatch = useDispatch();

  const cardPileModalNames = {
    enemyDiscard: `${enemyName}'s Discard`,
    enemyBanish: `${enemyName}'s Banish`,
    yourDiscard: 'Your Discard',
    yourBanish: 'Your Banish',
    yourDeck: 'Your Deck (not shown in order)',
    enemyDeck: 'Enemy Deck' // dev only
  };

  return activeModalCardPile ? (
    <CardViewModal
      title={cardPileModalNames[activeModalCardPile]}
      cardIds={activeModalCardPile === 'yourDeck'
        ? [...modalCards].sort((a, b) => rarityScore[cards[b].rarity] - rarityScore[cards[a].rarity])
        : [...modalCards].reverse()
      }
      closeModal={() => dispatch(actions.setActiveModalCardPile(null))}
    />
  ) : null;
};
