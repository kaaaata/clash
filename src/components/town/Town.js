import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer, Text } from '../particles';
import { TownActionCard } from './TownActionCard';
import { WorkForGold } from './WorkForGold';
import { ReceiveBlessing } from './ReceiveBlessing';
import { PurchaseCards } from './PurchaseCards';
import { MonsterPreview } from '../modals/MonsterPreview';
import { RobberyWheel } from './randomEvents';
import { townCss } from './townCss';
import { RemoveCards } from './RemoveCards';
import { TreasureSlime } from './randomEvents/TreasureSlime';

export const Town = () => {
  const {
    energy,
    day,
    townActions,
    completedTownActions,
    feed
  } = useSelector(state => ({
    energy: state.clashTown.energy,
    day: state.clashTown.day,
    townActions: state.clashTown.townActions,
    completedTownActions: state.clashTown.completedTownActions,
    feed: state.clashTown.feed
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const [townActionDescription, setTownActionDescription] = useState('Choose an action!');
  const [activeModal, setActiveModal] = useState([4, 7].includes(day) ? 'Receive Blessing' : null);

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
    case 'Work for Gold':
      modal = <WorkForGold closeModal={() => setActiveModal(null)} />;
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
    case 'Spin the Wheel':
      modal = <RobberyWheel rng={Math.random()} closeModal={() => setActiveModal(null)} />;
      break;
    case 'Treasure Slime':
      modal = <TreasureSlime rng={Math.random()} closeModal={() => setActiveModal(null)} />;
      break;
    case 'Learn Magic':
      modal = (
        <PurchaseCards
          title='Learn Magic'
          image='double_fireball'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Brew Potions':
      modal = (
        <PurchaseCards
          title='Brew Potions'
          image='blue_potion'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Buy Weapons':
      modal = (
        <PurchaseCards
          title='Buy Weapons'
          image='slice'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Recruit Allies':
      modal = (
        <PurchaseCards
          title='Recruit Allies'
          image='recruiter_event'
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    case 'Donate a Card':
      modal = <RemoveCards closeModal={() => setActiveModal(null)} />;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <div css={townCss}>
        <Spacer height={40} />
        <Text type='header' centered>Town</Text>
        <Spacer height={40} />
        <FlexContainer>
          <FlexContainer
            className='updates'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Text type='header'>Day: {day}/9</Text>
            <Spacer height={20} />
            <div className='feed'>
              {feed.map((text, index) => (
                <React.Fragment key={index}>
                  <Text type='small' lineHeight={1.25}>{text}</Text>
                  <Spacer height={7} />
                </React.Fragment>
              ))}
            </div>
            <Spacer height={20} />
            <Text type='paragraph' className='description'>{townActionDescription}</Text>
          </FlexContainer>
          <div className='actions'>
            {townActions.map((i, index) => (
              <TownActionCard
                key={index}
                name={i.name}
                image={i.image}
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
                    if (i.name === 'Learn Magic') {
                      dispatch(actions.setTownPurchasableCards('magic'));
                    } else if (i.name === 'Brew Potions') {
                      dispatch(actions.setTownPurchasableCards('potions'));
                    } else if (i.name === 'Buy Weapons') {
                      dispatch(actions.setTownPurchasableCards('attacks'));
                    } else if (i.name === 'Recruit Allies') {
                      dispatch(actions.setTownPurchasableCards('allies'));
                    }
                    setActiveModal(i.name);
                  }
                }}
              />
            ))}
          </div>
        </FlexContainer>
      </div>

      {modal}
    </React.Fragment>
  );
};
