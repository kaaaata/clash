import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const GoblinBomber = ({ closeModal }) => {
  const { hasBomb, hasBurn, hasFreeze } = useSelector(state => ({
    hasBomb: state.clashPlayer.deck.includes('Bomb'),
    hasBurn: state.clashPlayer.deck.includes('Burn'),
    hasFreeze: state.clashPlayer.deck.includes('Freeze')
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
              You are surprised by a <span className='green'>goblin</span> (called Wayne) holding a <span className='red'>bomb!</span> He menacingly waves it in your face. "Me make bomb!!!" he screeches. <span className='red'>"Give fire!!!"</span>
            </React.Fragment>
          }
          options={[
            {
              name: 'Give Bomb',
              isDisabled: !hasBomb,
              redText: hasBomb ? 'Lose card: Bomb.' : 'Requires card: Bomb.',
              greenText: hasBomb ? 'Receive 15 gold.' : '',
              redTextFirst: true,
              onClick: () => {
                setPage('give_bomb');
                dispatch(actions.removeCardsFromCollection('Bomb'));
              }
            },
            {
              name: 'Give Burn',
              isDisabled: !hasBurn,
              redText: hasBurn ? 'Lose card: Burn.' : 'Requires card: Burn.',
              greenText: hasBurn ? 'Receive 5 gold.' : '',
              redTextFirst: true,
              onClick: () => {
                setPage('give_burn');
                dispatch(actions.removeCardsFromCollection('Burn'));
              }
            },
            {
              name: 'Give Freeze',
              isDisabled: !hasFreeze,
              redText: hasFreeze ? 'Lose card: Freeze.' : 'Requires card: Freeze.',
              greenText: hasFreeze ? 'Receive 10 gold.' : '',
              redTextFirst: true,
              onClick: () => {
                setPage('give_freeze');
                dispatch(actions.removeCardsFromCollection('Freeze'));
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
    case 'give_bomb':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              <span className='violet'>"My bomb!!"</span> the goblin exclaims, as he happily takes your bomb.
              <br /><br />
              He tosses you a few <span className='yellow'>coins</span>, and runs off.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive 15 gold.',
            onClick: () => {
              dispatch(actions.adjustPlayerGold(15));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'give_burn':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              <span className='red'>"I need fire!!"</span> the goblin exclaims. <span className='green'>"Thank you!!"</span>
              <br /><br />
              He tosses you a few <span className='yellow'>coins</span>, takes your burn, and runs off.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive 5 gold.',
            onClick: () => {
              dispatch(actions.adjustPlayerGold(5));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'give_freeze':
      pageComponent = (
        <EventModalPage
          page={4}
          text={
            <React.Fragment>
              <span className='blue'>"I like ice!!"</span> the goblin exclaims. <span className='blue'>"Ice make ice cream!!!"</span>
              <br /><br />
              He tosses you a few <span className='yellow'>coins</span>, takes the freeze, and runs off.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive 10 gold.',
            onClick: () => {
              dispatch(actions.adjustPlayerGold(10));
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
          text='You decide to leave the goblin to his antics.'
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
      title='Goblin Bomber'
      image='goblin_bomber_event'
    >
      {pageComponent}
    </EventModal>
  );
};
