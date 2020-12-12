import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer, Text, FlexItem } from '../particles';
import { TownActionCard } from './TownActionCard';
import { Timeline } from './Timeline';
import { MonsterPreview } from '../modals/MonsterPreview';
import {
  RobberyWheel,
  CatherineTheGreat,
  RemoveCards,
  GatherGold,
  DancingLady,
  CursedChest,
  Nemesis,
  Devourer
} from './randomEvents';
import { Crafting } from '../crafting/Crafting';
import { CardLootModal } from '../modals/CardLootModal';
import { townCss } from './townCss';
import { TreasureChest } from './randomEvents/TreasureChest';
import { townActions as _townActions } from './genTownActions';

export const Town = () => {
  const {
    energy,
    day,
    townActions,
    purchasableCards,
    completedTownActions,
    feed,
    yourImage
  } = useSelector(state => {
    let townActions = state.clashTown.townActions;
    if (
      window.flow.replaceTownEvents_toggle
      && typeof window.flow.replaceTownEvents_value === 'string'
    ) {
      townActions = [
        ...Array(7).fill(_townActions[window.flow.replaceTownEvents_value]),
        townActions[7]
      ];
    }
    return {
      lives: state.clashPlayer.lives,
      energy: state.clashTown.energy,
      day: state.clashTown.day,
      purchasableCards: state.clashTown.purchasableCards,
      townActions,
      completedTownActions: state.clashTown.completedTownActions,
      feed: state.clashTown.feed,
      yourImage: state.clashBattleStats.yourImage
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const [townActionDescription, setTownActionDescription] = useState('Choose an action!');
  const [activeModal, setActiveModal] = useState(
    window.flow.skipToBattle_toggle ? 'Next Day' : null
  );

  const genTownActionCardImage = (townAction, day) => {
    if (townAction.name === 'Next Day') {
      if (day === 10) {
        return 'death_red';
      } else if ([3, 6, 9].includes(day)) {
        return 'death';
      }
    } else if (townAction.name === 'Nemesis') {
      return yourImage;
    }
    
    return townAction.image;
  };

  useEffect(() => {
    // auto scroll feed to bottom when it updates
    if (feed.length) {
      const feedEl = document.querySelector('.feed');
      feedEl.scrollTop = feedEl.scrollHeight;
    }
  }, [feed.length]);

  useEffect(() => {
    if (window.flow.testTownEvent_toggle && typeof window.flow.testTownEvent_value === 'string') {
      const testTownEvent = window.flow.testTownEvent_value;
      if (testTownEvent === 'Mage') {
        dispatch(actions.setTownPurchasableCards('magic'));
      } else if (testTownEvent === 'Alchemist') {
        dispatch(actions.setTownPurchasableCards('potions'));
      } else if (testTownEvent === 'Blacksmith') {
        dispatch(actions.setTownPurchasableCards('attacks'));
      } else if (testTownEvent === 'Recruiter') {
        dispatch(actions.setTownPurchasableCards('allies'));
      }
      setActiveModal(testTownEvent);
    }
  }, [dispatch]);

  const closeModal = () => {
    setActiveModal(null);
    dispatch(actions.setCanVisitShop(true));
  };

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
    case 'Gather Gold':
      modal = <GatherGold closeModal={closeModal} />;
      break;
    case 'Upgrade a Card':
      modal = <Crafting closeModal={closeModal} />;
      break;
    case 'Next Day':
      modal = (
        <MonsterPreview
          title={`It's the end of the ${day}${daySuffix} day.`}
          retreatText='Back to Town'
          closeModal={closeModal}
        />
      );
      break;
    case 'Wheel of Robbery':
      modal = <RobberyWheel rng={Math.random()} closeModal={closeModal} />;
      break;
    case 'Challenge Battle':
      modal = <CatherineTheGreat closeModal={closeModal} />;
      break;
    case 'Blacksmith':
      modal = (
        <CardLootModal
          title='Blacksmith'
          image='dwarf_event'
          cardNames={purchasableCards.map(card => card.name)}
          cardCosts={purchasableCards.map(card => card.cost)}
          continueText='Back to Town'
          closeModal={closeModal}
        />
      );
      break;
    case 'Recruiter':
      modal = (
        <CardLootModal
          title='Recruiter'
          image='recruiter_event'
          cardNames={purchasableCards.map(card => card.name)}
          cardCosts={purchasableCards.map(card => card.cost)}
          continueText='Back to Town'
          closeModal={closeModal}
        />
      );
      break;
    case 'Mage':
      modal = (
        <CardLootModal
          title='Mage'
          image='mage_event'
          cardNames={purchasableCards.map(card => card.name)}
          cardCosts={purchasableCards.map(card => card.cost)}
          continueText='Back to Town'
          closeModal={closeModal}
        />
      );
      break;
    case 'Alchemist':
      modal = (
        <CardLootModal
          title='Alchemist'
          image='alchemist_event'
          cardNames={purchasableCards.map(card => card.name)}
          cardCosts={purchasableCards.map(card => card.cost)}
          continueText='Back to Town'
          closeModal={closeModal}
        />
      );
      break;
    case 'Burn a Card':
      modal = <RemoveCards closeModal={closeModal} />;
      break;
    case 'Treasure Chest':
      modal = <TreasureChest rng={Math.random()} closeModal={closeModal} />;
      break;
    case 'Dancing Lady':
      modal = <DancingLady closeModal={closeModal} />;
      break;
    case 'Cursed Chest':
      modal = <CursedChest closeModal={closeModal} />;
      break;
    case 'Nemesis':
      modal = <Nemesis closeModal={closeModal} />;
      break;
    case 'The Devourer':
      modal = <Devourer closeModal={closeModal} />;
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
                isDisabled={energy < i.energy || completedTownActions[index]}
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    dispatch(actions.setCanVisitShop(false));
                    if (i.name !== 'Next Day') {
                      dispatch(actions.setTownActionCompleted(index));
                      dispatch(actions.adjustPlayerEnergy(-1 * i.energy));
                    }
                    if (i.name === 'Mage') {
                      dispatch(actions.setTownPurchasableCards('magic'));
                    } else if (i.name === 'Alchemist') {
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
