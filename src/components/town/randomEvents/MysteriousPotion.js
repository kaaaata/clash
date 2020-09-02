import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

const possiblePotions = [
  { name: 'Attack Potion', stat: 'attack', flavorText: 'stronger' },
  { name: 'Magic Potion', stat: 'magic', flavorText: 'wiser' },
  { name: 'Defense Potion', stat: 'defense', flavorText: 'tougher' },
  { name: 'Explosive Potion', stat: null, flavorText: null }
];

export const MysteriousPotion = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');
  const potion = possiblePotions[Math.floor(rng * 4)];

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You stumble across a mysterious
              <span className='blue'> blue potion. </span>
              It looks like someone accidentally dropped it.
              <br /><br />
              You don't recognize it, but it would be a <span className='violet'>shame</span> to leave it behind....
            </React.Fragment>
          }
          options={[
            {
              name: 'Drink It',
              greenText: '75%: temporary stat boost.',
              redText: '25%: no effect.',
              onClick: () => setPage(potion.name === 'Explosive Potion' ? 'drink_explosive' : 'drink')
            },
            {
              name: 'Keep It',
              greenText: 'Add the potion to your deck.',
              onClick: () => setPage('keep')
            },
            {
              name: 'Leave it',
              onClick: () => setPage('leave')
            }
          ]}
        />
      );
      break;
    case 'drink_explosive':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              You attempt to drink the potion, but it <span className='red'>explodes</span> violently! It must have been a weirdly colored <span className='red'>Explosive Potion</span>.
              <br /><br />
              Unfortunately, you are now left with nothing but a handful of glass dust.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    case 'drink':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              You drink the potion, and realize it's actually just a weirdly colored <span className='blue'>{potion.name}!</span>
              <br /><br />
              You feel a little <span className='yellow'>{potion.flavorText}</span>.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: `Gain +1 ${potion.stat} until end of day.`,
            onClick: () => {
              dispatch(actions.setStats({
                stats: { [potion.stat]: 1 },
                type: 'bonuses',
                player: 'you',
                operation: 'adjust'
              }));
              dispatch(actions.addTownFeedText(
                `Gained temporary boost: +1 ${potion.stat}`
              ));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'keep':
      pageComponent = (
        <EventModalPage
          page={4}
          text={
            <React.Fragment>
              You take the potion and examine it closely. Turns out, it's actually just a weirdly colored <span className='blue'>{potion.name}!</span>
              <br /><br />
              You put it away for later.
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: `Receive card: ${potion.name}.`,
            onClick: () => {
              dispatch(actions.addCardsToCollection(potion.name));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'leave':
      pageComponent = (
        <EventModalPage
          page={5}
          text='You decide not to interact with the potion.'
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
      title='Mysterious Potion'
      image='mysterious_potion'
    >
      {pageComponent}
    </EventModal>
  );
};
