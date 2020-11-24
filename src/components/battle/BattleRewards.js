import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { effects } from '../styles';
import { packs } from '../shop/packs';
import { genPackCardNames } from '../shop/genPackCardNames';
import { genGuaranteedTownAction } from '../town/genTownActions';

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
    day
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
    day: state.clashTown.day
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');
  
  const returnToTown = () => {
    if (!didPlayerWin) {
      dispatch(actions.addTownFeedText(`You were defeated by: ${enemyName}! You lose 1 life.`));
      dispatch(actions.adjustPlayerLives(-1));
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
      pageComponent = (
        <EventModalPage
          page={1}
          text={didPlayerWin ? (
            <React.Fragment>
              The enemy drops some <span className='yellow'>gold!</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              You were no match for the <span className='red'>{enemyName}!</span>
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : '',
            redText: didPlayerWin ? '' : 'Lose 1 life.',
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
              I should prepare for tomorrow.
            </React.Fragment>
          }
          options={[
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
              name: 'Plan Ahead',
              greenText: `-1 energy reserved. Guaranteed event tomorrow: ${guaranteedTownAction.name} (${guaranteedTownAction.energy} energy).`,
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                dispatch(actions.setGuaranteedTownAction(guaranteedTownAction.name));
                returnToTown();
              }
            }
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
        image={winnerImage}
        imageContainerCss={isEnemyElite && didPlayerLose
          ? `${effects.rainbow} animation: rainbow 5s infinite;`
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
