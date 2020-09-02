import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { random, sample } from 'lodash';
import { EventModal, EventModalPage } from '../modals/EventModal';

const flavorTexts = [
  'cleaning the pig pen.',
  'patching up a few houses.',
  'cleaning the sewers.',
  'fixing a couple fences.',
  'selling some cookies.',
  'delivering some parcels.',
  'sweeping the streets.',
  'beating up some hoodlums.',
  'weaving some baskets.',
  'selling some fish.',
  'herding some sheep.'
];

export const WorkForGold = ({ closeModal }) => {
  const dispatch = useDispatch();

  const goldEarned = random(5, 15);

  return (
    <EventModal
      title='You search for a job, and wind up...'
      image='gold'
    >
      <EventModalPage
        page={1}
        text={`...${sample(flavorTexts)}`}
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
