import { jsx } from '@emotion/core'; /** @jsx jsx */
import { shuffle } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { CardViewModal } from '../modals/CardViewModal';

export const CardPileModal = () => {
  const { activeModalCardPile, cards, enemyName } = useSelector(state => ({
    activeModalCardPile: state.clashBattleCards.activeModalCardPile,
    cards: state.clashBattleCards.activeModalCardPile
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
        ? shuffle(cards) :
        cards.map(_ => _).reverse()
      }
      closeModal={() => dispatch(actions.setActiveModalCardPile(null))}
    />
  ) : null;
};
