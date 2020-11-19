import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer, Text, FlexItem } from '../particles';
import { TownActionCard } from './TownActionCard';
import { ReceiveBlessing } from './ReceiveBlessing';
import { Timeline } from './Timeline';
import { MonsterPreview } from '../modals/MonsterPreview';
import {
  RobberyWheel,
  TreasureSlime,
  CatherineTheGreat,
  RemoveCards,
  FreeGold,
  ExtraLife,
  PurchaseCards,
  DancingLady
} from './randomEvents';
import { townCss } from './townCss';
import { TreasureChest } from './randomEvents/TreasureChest';

const genTownActionCardImage = (townAction, day) => {
  if (townAction.name === 'Next Day') {
    if (day === 10) {
      return 'death_red';
    } else if ([3, 6, 9].includes(day)) {
      return 'death';
    }
  }

  return townAction.image;
};

export const Town = () => {
  const {
    lives,
    energy,
    day,
    townActions,
    completedTownActions,
    feed,
    receivedBlessings
  } = useSelector(state => ({
    lives: state.clashPlayer.lives,
    energy: state.clashTown.energy,
    day: state.clashTown.day,
    townActions: state.clashTown.townActions,
    completedTownActions: state.clashTown.completedTownActions,
    feed: state.clashTown.feed,
    receivedBlessings: state.clashTown.receivedBlessings
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const canReceiveBlessing = !!lives
    && [4, 7, 10].includes(day)
    && !receivedBlessings[day];

  const [townActionDescription, setTownActionDescription] = useState('Choose an action!');
  const [activeModal, setActiveModal] = useState(canReceiveBlessing ? 'Receive Blessing' : null);

  useEffect(() => {
    if (feed.length) {
      // auto scroll feed to bottom when it updates
      const feedEl = document.querySelector('.feed');
      feedEl.scrollTop = feedEl.scrollHeight;
    }
  }, [feed.length])

  let daySuffix = 'th';
  if (day === 1) {
    daySuffix = 'st';
  } else if (day === 2) {
    daySuffix = 'nd';
  } else if (day === 3) {
    daySuffix = 'rd';
  }
  
  let modal;
  switch (activeModal) {
    case 'Make Money':
      modal = <FreeGold closeModal={() => setActiveModal(null)} />;
      break;
    case 'Extra Life':
      modal = <ExtraLife closeModal={() => setActiveModal(null)} />;
      break;
    case 'Receive Blessing':
      modal = <ReceiveBlessing closeModal={() => setActiveModal(null)} />;
      break;
    case 'Next Day':
      modal = (
        <MonsterPreview
          title={`It's the end of the ${day}${daySuffix} day.`}
          retreatText='Back to Town'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Goblin\'s Game':
      modal = <RobberyWheel rng={Math.random()} closeModal={() => setActiveModal(null)} />;
      break;
    case 'Treasure Slime':
      modal = <TreasureSlime rng={Math.random()} closeModal={() => setActiveModal(null)} />;
      break;
    case 'Challenge Battle':
      modal = <CatherineTheGreat closeModal={() => setActiveModal(null)} />;
      break;
    case 'Blacksmith':
      modal = (
        <PurchaseCards
          title='Blacksmith'
          image='dwarf_event'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Recruiter':
      modal = (
        <PurchaseCards
          title='Recruiter'
          image='recruiter_event'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Mage':
      modal = (
        <PurchaseCards
          title='Mage'
          image='mage_event'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Apothecary':
      modal = (
        <PurchaseCards
          title='Apothecary'
          image='alchemist_event'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Donate a Card':
      modal = <RemoveCards closeModal={() => setActiveModal(null)} />;
      break;
    case 'Treasure Chest':
      modal = <TreasureChest rng={Math.random()} closeModal={() => setActiveModal(null)} />;
      break;
    case 'Dancing Lady':
      modal = <DancingLady closeModal={() => setActiveModal(null)} />;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <FlexContainer flexDirection='column' justifyContent='center' alignItems='center' _css={townCss}>
        <Text type='header' centered>Town</Text>
        <Spacer height={40} />
        <FlexContainer>
          <FlexContainer
            className='updates'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Text type='header'>Day: {day}/10</Text>
            <Spacer height={20} />
            <FlexItem className='feed'>
              {feed.map((text, index) => (
                <React.Fragment key={index}>
                  <Text type='mini' lineHeight={1.25}>{text}</Text>
                  <Spacer height={7} />
                </React.Fragment>
              ))}
            </FlexItem>
            <Spacer height={20} />
            <Text type='paragraph' className='description'>{townActionDescription}</Text>
          </FlexContainer>
          <div className='actions'>
            {townActions.map((i, index) => (
              <TownActionCard
                key={index}
                name={i.name}
                image={genTownActionCardImage(i, day)}
                energy={i.energy}
                canAfford={energy >= i.energy}
                isDisabled={
                  (day === 1 && i.name !== 'Next Day')
                  || completedTownActions[index]
                }
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    if (i.name !== 'Next Day') {
                      dispatch(actions.setTownActionCompleted(index));
                      dispatch(actions.adjustPlayerEnergy(-1 * i.energy));
                    }
                    if (i.name === 'Mage') {
                      dispatch(actions.setTownPurchasableCards('magic'));
                    } else if (i.name === 'Apothecary') {
                      dispatch(actions.setTownPurchasableCards('potions'));
                    } else if (i.name === 'Blacksmith') {
                      dispatch(actions.setTownPurchasableCards('attacks'));
                    } else if (i.name === 'Recruiter') {
                      dispatch(actions.setTownPurchasableCards('allies'));
                    }
                    setActiveModal(i.name);
                  } else {
                    dispatch(actions.setToast('Not enough energy!'));
                  }
                }}
              />
            ))}
          </div>
        </FlexContainer>

        <FlexItem />
        
        <Timeline />
      </FlexContainer>

      {modal}
    </React.Fragment>
  );
};
