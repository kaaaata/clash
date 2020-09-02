import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { GameOver } from '../modals/GameOver';

export const BattleRewards = () => {
  const {
    didPlayerWin,
    didPlayerLose,
    isGameOver,
    winnerImage,
    battleRewardGold,
    battleRewardCards,
    enemyType,
    enemyHueRotate,
    enemyName
  } = useSelector(state => ({
    didPlayerWin: state.clashBattleStats.winner
      && state.clashBattleStats.yourName === state.clashBattleStats.winner,
    didPlayerLose: state.clashBattleStats.winner
      && state.clashBattleStats.yourName !== state.clashBattleStats.winner,
    isGameOver: state.clashBattleStats.winner
      && state.clashBattleStats.yourName !== state.clashBattleStats.winner
      && state.clashBattleStats.isEnemyElite,
    winnerImage: state.clashBattleStats.winnerImage,
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards,
    enemyType: state.clashBattleStats.enemyType,
    enemyHueRotate: state.clashBattleStats.enemyHueRotate,
    enemyName: state.clashBattleStats.enemyName
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  const battleDefeatGold = Math.floor(battleRewardGold / 4);
  
  const returnToTown = () => {
    const townFeedMessage = didPlayerWin
      ? `You defeated: ${enemyName}`
      : `You were defeated by: ${enemyName}`
    if (enemyType === 'wave') {
      dispatch(actions.startNewDay({ feedInitialMessage: townFeedMessage }));
    } else {
      dispatch(actions.addTownFeedText(townFeedMessage));
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
              The enemy drops some <span className='yellow'>gold.</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              The enemy <span className='red'>steals</span> some of your <span className='yellow'>gold.</span>
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : '',
            redText: didPlayerWin ? '' : `Lose ${battleDefeatGold} gold.`,
            onClick: () => {
              if (didPlayerWin) {
                dispatch(actions.adjustPlayerGold(battleRewardGold));
                setPage('steal_cards');
              } else {
                dispatch(actions.adjustPlayerGold(-1 * battleDefeatGold));
                returnToTown();
              }
            }
          }]}
        />
      );
      break;
    case 'steal_cards':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              As the enemy flees, they drop some <span className='yellow'>cards</span> from their deck!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Take up to 2 cards from the enemy\'s deck.',
            onClick: () => setPage('card_loot_modal')
          }]}
        />
      );
      break;
    default:
      break;
  }

  if (isGameOver) {
    return (
      <GameOver />
    );
  } else if (page === 'card_loot_modal') {
    return (
      <CardLootModal
        maxCardsToTake={2}
        cards={battleRewardCards}
        closeModal={returnToTown}
      />
    );
  } else if (didPlayerWin || didPlayerLose) {
    return (
      <EventModal
        title={didPlayerWin ? 'Victory!' : 'Defeat!'}
        image={winnerImage}
        imageProps={(enemyHueRotate && didPlayerLose)
          ? { filter: `hue-rotate(${enemyHueRotate}deg)` }
          : null
        }
      >
        {pageComponent}
      </EventModal>
    );
  } else {
    return null;
  }
};
