import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const GoldBar = ({ closeModal }) => {
  const dispatch = useDispatch();

  return (
    <EventModal
      title='Gold Bar'
      image='gold_bar'
    >
      <EventModalPage
        page={1}
        text='You find a gold bar!'
        options={[{
          name: 'Continue',
          greenText: 'Receive 1 gold bar.',
          onClick: () => {
            dispatch(actions.adjustPlayerGoldBars(1));
            closeModal();
          }
        }]}
      />
    </EventModal>
  );
};
