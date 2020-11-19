import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const ExtraLife = ({ closeModal }) => {
  const dispatch = useDispatch();

  return (
    <EventModal
      title='Extra Life'
      image='life'
    >
      <EventModalPage
        page={1}
        text='You find an extra life!'
        options={[{
          name: 'Continue',
          greenText: 'Receive 1 life.',
          onClick: () => {
            dispatch(actions.adjustPlayerLives(1));
            closeModal();
          }
        }]}
      />
    </EventModal>
  );
};
