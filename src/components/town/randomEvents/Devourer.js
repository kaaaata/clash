import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { createNewCard } from '../../../cards/createNewCard';
import { sample, sampleSize } from 'lodash';

export const Devourer = ({ closeModal }) => {
  const { deck } = useSelector(state => ({
    deck: state.clashPlayer.deck
  }), shallowEqual);
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
              A <span className='violet'>mysterious being</span> approaches you. It seems to be an oversized, sentient <span className='yellow'>card!</span>
              <br /><br />
              It gnashes its teeth furiously, as if inviting you to <span className='red'>feed</span> it something...
            </React.Fragment>
          }
          options={[
            {
              name: 'Offer a Meal',
              redText: 'Give 2 random cards.',
              greenText: 'Get 2 copies of The Devourer.',
              redTextFirst: true,
              cardTooltips: ['The Devourer'],
              onClick: () => {
                dispatch(actions.removeCardsFromCollection(sampleSize(deck, 2)));
                setPage('nom2');
              }
            },
            {
              name: 'Offer a Snack',
              redText: 'Give a random card.',
              greenText: 'Get a copy of The Devourer.',
              redTextFirst: true,
              cardTooltips: ['The Devourer'],
              onClick: () => {
                dispatch(actions.removeCardsFromCollection(sample(deck)));
                setPage('nom');
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
    case 'nom':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              The weird card <span className='blue'>gobbles</span> up your offering.
              <br /><br />
              As you turn to leave, you notice it following you. You may have gained an <span className='green'>ally</span>....
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Add a copy of The Devourer into your deck.',
            cardTooltips: ['The Devourer'],
            onClick: () => {
              dispatch(actions.addCardsToCollection(createNewCard('The Devourer')));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'nom2':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              The weird card eagerly <span className='blue'>gobbles</span> up your offering.
              <br /><br />
              To your surprise, it splits into two clones of itself! As you turn to leave, you notice both clones following you. You may have gained a couple <span className='green'>allies</span>....
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Add 2 copies of The Devourer into your deck.',
            cardTooltips: ['The Devourer'],
            onClick: () => {
              dispatch(actions.addCardsToCollection(
                ['The Devourer', 'The Devourer'].map(i => createNewCard(i))
              ));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'leave':
      pageComponent = (
        <EventModalPage
          page={4}
          text='You run away as fast as you can.'
          options={[{
            name: 'Back to Town',
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
      title='The Devourer'
      image='devourer'
    >
      {pageComponent}
    </EventModal>
  );
};
