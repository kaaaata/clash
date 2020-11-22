import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { effects } from '../styles';

export const BattleRewards = () => {
  const {
    didPlayerWin,
    didPlayerLose,
    winnerImage,
    battleRewardGold,
    battleRewardCards,
    enemyType,
    isEnemyElite,
    enemyName
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
    enemyName: state.clashBattleStats.enemyName
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
  switch (page) {
    case 'default':
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
    case 'energy_reservation':
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
              greenText: '-1 energy reserved.',
              onClick: () => {
                dispatch(actions.adjustPlayerEnergyReserved(-1));
                returnToTown();
              }
            }
          ]}
        />
      );
      break;
    default:
      break;
  }

  if (page === 'card_loot_modal') {
    return (
      <CardLootModal
        title='The enemy dropped some cards! Select cards to keep'
        image={winnerImage}
        maxCardsToTake={2}
        showCounter
        cardIds={battleRewardCards}
        closeModal={() => {
          if (enemyType === 'wave') {
            setPage('energy_reservation');
          } else {
            returnToTown();
          }
        }}
      />
    );
  } else if (didPlayerWin || didPlayerLose) {
    return (
      <EventModal
        title={didPlayerWin ? 'Victory!' : 'Defeat!'}
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
