import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const CaveFireball = ({ rng, closeModal }) => {
  const { hasFire, hasMage } = useSelector(state => ({
    hasFire: state.clashPlayer.deck.includes('Fire'),
    hasMage: state.clashPlayer.deck.includes('Mage')
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
              You wander into a cave full of<span className='violet'> pink crystals.</span>
              <br /><br />
              Out of nowhere, a huge <span className='red'>ball of fire</span> comes crashing towards you!
            </React.Fragment>
          }
          options={[
            {
              name: 'Catch It',
              greenText: '75%: Receive card: Fire.',
              redText: '25%: Receive card: Burn.',
              onClick: () => setPage('catch_it')
            },
            {
              name: 'Blast It',
              isDisabled: !hasFire,
              redText: hasFire ? 'Lose card: Fire.' : 'Requires card: Fire.',
              greenText: hasFire ? 'Receive card: Super Fire.' : '',
              redTextFirst: true,
              onClick: () => {
                setPage('blast_it');
                dispatch(actions.removeCardsFromCollection('Fire'));
              }
            },
            {
              name: 'Counter It',
              isDisabled: !hasMage,
              greenText: hasMage ? 'Receive card: Super Fire.' : '',
              redText: hasMage ? '' : 'Requires card: Mage.',
              onClick: () => setPage('counter_it')
            }
          ]}
        />
      );
      break;
    case 'catch_it':
      pageComponent = (
        <EventModalPage
          key={2}
          text={
            <React.Fragment>
              You extend your hand and try to <span className='green'>catch</span> the fire!
              <br /><br />
              {rng < 0.75 ? (
                <React.Fragment>
                  Somehow, you <span className='green'>actually caught it!</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  The fire <span className='red'>burns you terribly!</span> You wonder why you even tried.
                </React.Fragment>
              )}
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: rng < 0.75 ? 'Receive card: Fire.' : '',
            redText: rng < 0.75 ? '' : 'Receive card: Burn.',
            onClick: () => {
              dispatch(actions.addCardsToCollection(rng < 0.75 ? 'Fire' : 'Burn'));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'blast_it':
      pageComponent = (
        <EventModalPage
          key={3}
          text={
            <React.Fragment>
              You <span className='red'>blast</span> the fire with some fire of your own!
              <br /><br />
              The two fireballs <span className='yellow'>clash and sparkle</span> in the air, and fuse into one giant fireball!!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive card: Super Fire.',
            onClick: () => {
              dispatch(actions.addCardsToCollection('Super Fire'));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'counter_it':
      pageComponent = (
        <EventModalPage
          key={4}
          text={
            <React.Fragment>
              Fortunately, you have made allies with a <span className='blue'>Mage!</span>
              <br /><br />
              She <span className='violet'>deftly</span> counters the fireball, and redirects its power into a <span className='violet'>spell</span> for later use!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive card: Super Fire.',
            onClick: () => {
              dispatch(actions.addCardsToCollection('Super Fire'));
              closeModal();
            }
          }]}
        />
      );
      break;
    default:
      break;
  }

  return (
    <EventModal
      title='Cave Fireball'
      image='cave_fireball'
    >
      {pageComponent}
    </EventModal>
  );
};
