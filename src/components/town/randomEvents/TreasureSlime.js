import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../monsters/monsters';
import { TreasureChest } from './TreasureChest';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const TreasureSlime = ({ rng, closeModal }) => {
  const { hasKey, gold } = useSelector(state => ({
    hasKey: state.clashPlayer.deck.includes('Strange Key'),
    gold: state.clashPlayer.gold
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
              You encounter a treasure chest enveloped by a <span className='yellow'>giant yellow slime!</span>
              <br /><br />
              It notices you, but doesn't move.
            </React.Fragment>
          }
          options={[
            {
              name: 'Give Key',
              isDisabled: !hasKey,
              redText: hasKey ? 'Lose card: Strange Key.' : 'Requires card: Strange Key.',
              greenText: hasKey ? 'Open the chest.' : '',
              redTextFirst: true,
              onClick: () => {
                setPage('give_key');
                dispatch(actions.removeCardsFromCollection('Strange Key'));
              }
            },
            {
              name: 'Give Gold',
              isDisabled: gold < 100,
              redText: gold < 100 ? 'Requires: 100 gold.' : 'Lose 100 gold.',
              greenText: gold < 100 ? '' : 'Gain 150 gold.',
              redTextFirst: true,
              onClick: () => {
                setPage('give_gold');
                dispatch(actions.adjustPlayerGold(-100));
              }
            },
            {
              name: 'Attack',
              greenText: 'Fight enemy: Treasure Slime.',
              onClick: () => setPage('monster_preview')
            },
            {
              name: 'Leave',
              onClick: () => setPage('leave')
            }
          ]}
        />
      );
      break;
    case 'give_key':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              You toss the slime your <span className='yellow'>Strange Key</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the key into its body!
              <br /><br />
              The chest is <span className='green'>unlocked!</span>
            </React.Fragment>
          }
          options={[{
            name: 'Open Chest',
            onClick: () => setPage('treasure_chest')
          }]}
        />
      );
      break;
    case 'give_gold':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              You toss the slime a handful of <span className='yellow'>coins</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the gold into its body!
              <br /><br />
              The slime coughs up some <span className='yellow'>loot</span> in thanks.
            </React.Fragment>
          }
          options={[{
            name: 'Take Loot',
            greenText: 'Receive 150 gold.',
            onClick: () => {
              dispatch(actions.adjustPlayerGold(150));
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
          text='You leave the slime alone.'
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

  if (page === 'monster_preview') {
    return (
      <MonsterPreview
        title='You attack the slime!'
        monsterOverride={eventMonsters['Treasure Slime']}
        closeModal={closeModal}
      />
    );
  } else if (page === 'treasure_chest') {
    return (
      <TreasureChest rng={rng} closeModal={closeModal} />
    );
  } else {
    return (
      <EventModal
        title='Treasure Slime'
        image='treasure_slime_event'
      >
        {pageComponent}
      </EventModal>
    );
  }
};
