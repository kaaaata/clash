import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { CardViewModal } from '../modals/CardViewModal';

export const RemoveCards = ({ closeModal }) => {
  const { deck } = useSelector(state => ({
    deck: state.clashPlayer.deck,
  }), shallowEqual);
  const dispatch = useDispatch();

  return (
    <CardViewModal
      title='Choose a card to remove'
      shouldShowCardCount={false}
      cards={deck}
      cardOnClick={(card) => {
        dispatch(actions.removeCardsFromCollection(card));
        closeModal();
      }}
    />
  );
};
