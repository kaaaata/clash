import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { colors, effects } from '../styles';
import { packs } from '../shop/packs';
import { genPackCardNames } from '../shop/genPackCardNames';
import { genGuaranteedTownAction } from '../town/genTownActions';
import { sampleSize } from 'lodash';
import { cards } from '../../cards/cards';
import { store } from '../../stores/store';

export const BattleRewards = () => {
  const {
    didPlayerWin,
    didPlayerLose,
    winnerImage,
    battleRewardGold,
    battleRewardCards,
    enemyType,
    isEnemyElite,
    enemyName,
    day,
    yourImage,
    energyReserved
  } = useSelector(state => ({
    didPlayerWin: state.clashBattleStats.winner
      && state.clashBattleStats.yourName === state.clashBattleStats.winner,
    didPlayerLose: state.clashBattleStats.winner
      && state.clashBattleStats.yourName !== state.clashBattleStats.winner,
    isGameOver: !state.clashPlayer.lives,
    winnerImage: state.clashBattleStats.winnerImage,
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards,
    enemyType: state.clashBattleStats.enemyType,
    isEnemyElite: state.clashBattleStats.isEnemyElite,
    enemyName: state.clashBattleStats.enemyName,
    day: state.clashTown.day,
    yourImage: state.clashBattleStats.yourImage,
    energyReserved: state.clashTown.energyReserved
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  const canReceiveBlessing = [3, 6, 9].includes(day);
  
  const returnToTown = () => {
    if (!didPlayerWin) {
      if (enemyName === 'Nemesis') {
        const lostCards = sampleSize(store.getState().clashPlayer.deck, 2);
        dispatch(actions.addTownFeedText(
          `You were defeated by: ${enemyName}! You lost ${battleRewardGold} gold, and two cards: ${cards[lostCards[0]].name} and ${cards[lostCards[1]].name}.`
        ));
        dispatch(actions.adjustPlayerGold(battleRewardGold * -1))
        dispatch(actions.removeCardsFromCollection(lostCards));
      } else {
        dispatch(actions.addTownFeedText(`You were defeated by: ${enemyName}! You lost 1 life.`));
        dispatch(actions.adjustPlayerLives(-1));
      }
      dispatch(actions.setScene('town'));
    } else if (enemyType === 'wave') {
      dispatch(actions.startNewDay());
    } else {
      dispatch(actions.setScene('town'));
    }
    dispatch(actions.setCanVisitShop(true));
  };

  let pageComponent;
  let modalTitle;
  switch (page) {
    case 'default':
      modalTitle = didPlayerWin ? 'Victory!' : 'Defeat!';
      pageComponent = (didPlayerWin && enemyName === 'The Evil Dragon') ? (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              <span className='red'>The Evil Dragon</span> collapses to the ground!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            onClick: () => dispatch(actions.setScene('win_screen'))
          }]}
        />
      ) : (
        <EventModalPage
          page={1}
          text={didPlayerWin ? (
            <React.Fragment>
              The enemy drops some <span className='yellow'>gold!</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              You were no match for <span className='red'>{enemyName}!</span>
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : '',
            redText: didPlayerWin
              ? ''
              : enemyName === 'Nemesis' ? `Lose ${battleRewardGold} gold, and 2 random cards from your deck`: 'Lose 1 life.',
            onClick: () => {
              if (didPlayerWin) {
                dispatch(actions.adjustPlayerGold(battleRewardGold));
                setPage('card_loot_modal');
              } else {
                returnToTown();
              }
            }
          }]}
        />
      );
      break;
    case 'energy_reservation': {
      const guaranteedTownAction = genGuaranteedTownAction();
      modalTitle = 'Preparation';
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              {canReceiveBlessing
                ? 'I learned something from that fight.'
                : 'I should prepare for tomorrow.'
              }
            </React.Fragment>
          }
          options={canReceiveBlessing ? [
            {
              name: 'Power',
              greenText: '-1 energy reserved. Gain +1 strength permanently.',
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                dispatch(actions.setToast('Received: +1 strength'));
                returnToTown();
              }
            },
            {
              name: 'Acuity',
              greenText: '-1 energy reserved. Gain +1 magic permanently.',
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                dispatch(actions.setToast('Received: +1 magic'));
                returnToTown();
              }
            },
            {
              name: 'Endurance',
              greenText: '-1 energy reserved. Gain +1 defense permanently.',
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                dispatch(actions.setToast('Received: +1 defense'));
                returnToTown();
              }
            }
          ] : [
            {
              name: 'Rest',
              greenText: '-1 energy reserved. Gain 10 gold.',
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                dispatch(actions.adjustPlayerGold(10));
                returnToTown();
              },
            },
            {
              name: 'Prepare',
              greenText: '+1 to max Re-draw uses.',
              redText: '+0 energy reserved.',
              redTextFirst: true,
              onClick: () => {
                dispatch(actions.adjustPlayerGold(10));
                dispatch(actions.incrementMaxVBars());
                returnToTown();
              },
            },
            {
              name: 'Lift',
              greenText: '+1 to max special ability uses.',
              redText: '+1 energy reserved.',
              redTextFirst: true,
              isDisabled: energyReserved === 10,
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(1));
                dispatch(actions.incrementMaxSpecialAbilityBars());
                returnToTown();
              },
            },
          ]}
        />
      );
      break;
    }
    default:
      break;
  }

  if (page === 'card_loot_modal') {
    let cardsProps = {};
    let cardsLootFlavorText;
    if (enemyType === 'wave') {
      if ([1, 2].includes(day)) {
        cardsProps.cardNames = genPackCardNames(packs.bronze);
      } else if ([3, 4, 5].includes(day)) {
        cardsProps.cardNames = genPackCardNames(packs.silver);
      } else if ([6, 7, 8].includes(day)) {
        cardsProps.cardNames = genPackCardNames(packs.gold);
      } else if (day === 9) {
        cardsProps.cardNames = genPackCardNames(packs.diamond);
      }
      cardsLootFlavorText = 'Card draft: select cards to keep';
    } else {
      cardsProps.cardIds = battleRewardCards;
      cardsLootFlavorText = 'Take up to 2 cards from the enemy\'s deck!';
    }

    return (
      <CardLootModal
        title={cardsLootFlavorText}
        image={winnerImage}
        maxCardsToTake={2}
        showCounter
        closeModal={() => {
          if (enemyType === 'wave') {
            setPage('energy_reservation');
          } else {
            returnToTown();
          }
        }}
        {...cardsProps}
      />
    );
  } else if (didPlayerWin || didPlayerLose) {
    return (
      <EventModal
        title={modalTitle}
        image={(didPlayerLose && enemyName === 'Nemesis') ? yourImage : winnerImage}
        imageContainerCss={isEnemyElite && didPlayerLose
          ? `${effects.rainbow} animation: rainbow 5s infinite;`
          : ''
        }
        imageCss={(didPlayerLose && enemyName === 'Nemesis')
          ? `filter: drop-shadow(0 0 15px ${colors.red})`
          : ''
        }
      >
        {pageComponent}
      </EventModal>
    );
  } else {
    return null;
  }
};
