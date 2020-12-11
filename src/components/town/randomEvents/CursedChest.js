import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { createNewCard } from '../../../cards/createNewCard';
import { sample } from 'lodash';
import { blueprints } from '../../../cards/blueprints';
import { CursedChestRemoveCards } from './RemoveCards';
import { cards } from '../../../cards/cards';

export const CursedChest = ({ closeModal }) => {
  const { deckCommonCards, deckUncommonCards } = useSelector(state => ({
    deckCommonCards: state.clashPlayer.deck.filter(cardId => cards[cardId].rarity === 'common'),
    deckUncommonCards: state.clashPlayer.deck.filter(cardId => cards[cardId].rarity === 'uncommon')
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');
  const [removedCardRarity, setRemovedCardRarity] = useState(null);

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You discover a <span className='violet'>cursed</span> chest!
              <br /><br />
              Despite your best efforts, it doesn't budge.
              <br /><br />
              But, the keyhole looks large enough to fit an <span className='blue'>offering...</span>
            </React.Fragment>
          }
          options={[
            {
              name: 'Cheap Offering',
              isDisabled: !deckCommonCards.length,
              redText: 'Give a common card.',
              greenText: 'Get a random uncommon card.',
              redTextFirst: true,
              onClick: () => {
                setRemovedCardRarity('common');
                setPage('remove_cards_modal');
              }
            },
            {
              name: 'Valuable Offering',
              isDisabled: !deckUncommonCards.length,
              redText: 'Give an uncommon card.',
              greenText: 'Get a random rare card.',
              redTextFirst: true,
              onClick: () => {
                setRemovedCardRarity('uncommon');
                setPage('remove_cards_modal');
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
    case 'given_offering': {
      const obtainedCardName = sample(
        blueprints.lootableCardsByRarity[removedCardRarity === 'common' ? 'uncommon' : 'rare']
      ).name;
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              You feed the chest a {removedCardRarity === 'common' ? 'common' : <span className='green'>uncommon</span>} card.
              <br /><br />
              You hear some grinding noises. Then, the chest shoots out a <span className={removedCardRarity === 'common' ? 'green' : 'blue'}>{obtainedCardName}!</span>
            </React.Fragment>
          }
          options={[
            {
              name: 'Continue',
              greenText: `Add a copy of ${obtainedCardName} into your deck.`,
              cardTooltips: [obtainedCardName],
              onClick: () => {
                dispatch(actions.addCardsToCollection(createNewCard(obtainedCardName)));
                closeModal();
              }
            }, {
              name: 'Leave',
              onClick: closeModal
            }
          ]}
        />
      );
      break;
    }
    case 'leave':
      pageComponent = (
        <EventModalPage
          page={4}
          text='You leave the chest be.'
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

  return page === 'remove_cards_modal' ? (
    <CursedChestRemoveCards
      cardIds={removedCardRarity === 'common' ? deckCommonCards : deckUncommonCards}
      closeModal={() => setPage('given_offering')}
    />
  ) : (
    <EventModal
      title='Cursed Chest'
      image='cursed_chest_event'
    >
      {pageComponent}
    </EventModal>
  );
};
