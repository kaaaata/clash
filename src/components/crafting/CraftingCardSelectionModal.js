import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { CardViewModal } from '../modals/CardViewModal';
import { cards } from '../../cards/cards';

export const CraftingCardSelectionModal = ({ title, cardIndexAlreadySelected, cardOnClick }) => {
  const { _cards } = useSelector(state => ({
    _cards: state.clashPlayer.deck
      .filter(card => cards[card].isCraftable)
      .filter((_, index) => index !== cardIndexAlreadySelected)
  }), shallowEqual);

  return (
    <CardViewModal
      title={title}
      shouldShowCardCount={false}
      cards={_cards}
      cardOnClick={cardOnClick}
    />
  );
};
