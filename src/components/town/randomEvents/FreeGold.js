import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { random } from 'lodash';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const FreeGold = ({ closeModal }) => {
  const dispatch = useDispatch();

  const goldEarned = random(20, 40);

  return (
    <EventModal
      title='Gather Gold'
      image='gold_with_padding'
    >
      <EventModalPage
        page={1}
        text='You earn a little gold.'
        options={[{
          name: 'Continue',
          greenText: goldEarned >= 0 && `Receive ${goldEarned} gold.`,
          onClick: () => {
            dispatch(actions.adjustPlayerGold(goldEarned));
            closeModal();
          }
        }]}
      />
    </EventModal>
  );
};
