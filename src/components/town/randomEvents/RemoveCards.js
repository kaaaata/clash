import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { CardViewModal } from '../../modals/CardViewModal';

export const RemoveCards = ({ closeModal }) => {
  const { deck } = useSelector(state => ({
    deck: state.clashPlayer.deck,
  }), shallowEqual);
  const dispatch = useDispatch();

  return (
    <CardViewModal
      title='Choose a card to remove'
      shouldShowCardCount={false}
      cardIds={deck}
      cardOnClick={(cardId) => {
        dispatch(actions.removeCardsFromCollection(cardId));
        closeModal();
      }}
      closeModal={closeModal}
      closeButtonText='Cancel'
    />
  );
};

export const CursedChestRemoveCards = ({ closeModal, cardIds }) => {
  const dispatch = useDispatch();

  return (
    <CardViewModal
      title='Choose a card to remove'
      shouldShowCardCount={false}
      cardIds={cardIds}
      cardOnClick={(cardId) => {
        dispatch(actions.removeCardsFromCollection(cardId));
        closeModal();
      }}
      closeModal={closeModal}
      shouldShowCloseButton={false}
    />
  );
};
