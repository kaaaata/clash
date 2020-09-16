import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { createNewCard } from '../../../cards/createNewCard';

export const DancingLady = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You encounter a weird <span className='blue'>flowy lady</span> dancing near a lake.
              <br /><br />
              "Come dance with me!" she says.
              <br /><br />
              You feel an odd magical presence in the air....
            </React.Fragment>
          }
          options={[
            {
              name: 'Dance of Peace',
              greenText: 'Add 4 copies of Blank into your deck.',
              onClick: () => {
                dispatch(actions.addCardsToCollection(
                  ['Blank', 'Blank', 'Blank', 'Blank'].map(i => createNewCard(i))
                ));
                setPage('dance_of_peace');
              }
            },
            {
              name: 'Dance of Rage',
              redText: 'and a copy of Burn into your deck.',
              greenText: 'Add a copy of Super Fire',
              onClick: () => {
                dispatch(actions.addCardsToCollection(
                  ['Super Fire', 'Burn'].map(i => createNewCard(i))
                ));
                setPage('dance_of_rage');
              }
            },
            {
              name: 'Leave',
              onClick: () => setPage('leave')
            }
          ]}
        />
      );
      break;
    case 'dance_of_peace':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              You empty your mind, and dance a <span className='green'>peaceful dance!</span>
              <br /><br />
              You feel somewhat fulfilled.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    case 'dance_of_rage':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              You fill yourself with <span className='red'>rage</span>, and let it all out in an <span className='red'>angry dance!</span>
              <br /><br />
              You feel more powerful, but also slightly overexerted...
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    case 'leave':
      pageComponent = (
        <EventModalPage
          page={4}
          text={'You decide to leave the lady to her antics.'}
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    default:
      break;
  }

  return (
    <EventModal
      title='Dancing Lady'
      image='dancing_lady_event'
    >
      {pageComponent}
    </EventModal>
  );
};
