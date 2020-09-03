import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { CardViewModal } from '../modals/CardViewModal';
import { cards } from '../../cards/cards';

export const CraftingCardSelectionModal = ({
  title,
  cardIndexAlreadySelected,
  cardOnClick,
  closeModal
}) => {
  const { _cards } = useSelector(state => {
    const result = state.clashPlayer.deck.filter(card => cards[card].isCraftable);
    if (cardIndexAlreadySelected !== -1) {
      result[cardIndexAlreadySelected] = null;
    }
    return { _cards: result };
  }, shallowEqual);

  return (
    <CardViewModal
      title={title}
      shouldShowCardCount={false}
      cards={_cards}
      cardOnClick={cardOnClick}
      closeModal={closeModal}
      shouldCloseOnClick={false}
      shouldShowCloseButton
    />
  );
};
