import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { store } from '../../stores/store';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish,
  YourHand,
  EnemyHand,
  Stack
} from './CardPile';
import { Portrait } from '../Portrait';
import { playFirstCardInRound } from '../../gameplay/playFirstCardInRound';
import { BattleRewards } from './BattleRewards';
import { CardPileModal } from './CardPileModal';
import { BattleLog } from './BattleLog';
import { VTrigger } from './VTrigger';
import { shuffle } from 'lodash';

const inDevelopment = process.env.NODE_ENV !== 'production';

const perspectiveCss = css`perspective: 2000px;`;

const battleSpeeds = {
  'Slow': 700,
  'Normal': 500,
  'Fast': 300
};

let isAnimating = false;

export const Battle = () => {
  const [vBars, setVBars] = useState(2);

  const battleSpeedMs = battleSpeeds[
    window.localStorage.getItem('clashsetting_battle_speed') || 'Normal'
  ];
  const dispatch = useDispatch();

  let interval = null;
  let renderActions = [];
  
  const executeRenderAction = (action) => {
    if (action) {
      action.forEach(subAction => {
        if (subAction) {
          dispatch(actions[subAction.actionKey](subAction.payload));
        }
      });
    }
  };

  const executeRenderActions = (renderActions) => {
    if (renderActions.length) {
      // later, if we want to allow pausing mid-animation, renderActions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      executeRenderAction(renderActions[0]);

      let i = 1;
      interval = setInterval(() => {
        executeRenderAction(renderActions[i]);

        if (++i === renderActions.length) {
          clearInterval(interval);
          isAnimating = false;
        }
      }, battleSpeedMs);
    } else {
      isAnimating = false;
    }
  };

  const handleClickCardInYourHand = (index) => {
    if (isAnimating) {
      return;
    }

    isAnimating = true;
    dispatch(actions.setBattleLogs([]));
    const t0 = performance.now();
    renderActions = playFirstCardInRound(index);
    const t1 = performance.now();
    if (inDevelopment) {
      console.log(`playCard took ${(t1 - t0).toFixed(3)} ms.`);
    }
    executeRenderActions(renderActions);
  };

  const handleActivateVTrigger = () => {
    if (isAnimating || !vBars) {
      return;
    }

    isAnimating = true;
    setVBars(vBars - 1);
    const renderActions = [];
    const mockState = {
      yourHand: [...store.getState().clashBattleCards.yourHand],
      yourDeck: [...store.getState().clashBattleCards.yourDeck],
    };
    let { yourHand, yourDeck } = mockState;

    yourDeck = shuffle([...yourDeck, ...yourHand]);
    yourHand = [null, null, null];

    renderActions.push([{
      actionKey: 'setYourHand',
      payload: [...yourHand]
    }, {
      actionKey: 'setYourDeck',
      payload: [...yourDeck]
    }]);

    renderActions.push([]);

    for (let i = 0; i < 3; i++) {
      yourHand[i] = yourDeck[yourDeck.length - 1];
      yourDeck = yourDeck.slice(0, yourDeck.length - 1);
      renderActions.push([{
        actionKey: 'setYourHand',
        payload: [...yourHand]
      }, {
        actionKey: 'setYourDeck',
        payload: [...yourDeck]
      }]);
    }

    executeRenderActions(renderActions);
  };

  return (
    <div>
      <Portrait player='enemy'/>
      <EnemyHand />
      <div css={perspectiveCss}>
        <EnemyDeck />
        <EnemyDiscard />
        <EnemyBanish />
      </div>

      <Stack />

      <Portrait player='you' />
      <YourHand cardOnClick={(index) => handleClickCardInYourHand(index)} />
      <div css={perspectiveCss}>
        <YourDeck />
        <YourDiscard />
        <YourBanish />
      </div>

      <BattleLog />
      <VTrigger handleActivateVTrigger={handleActivateVTrigger} bars={vBars} />
      
      <CardPileModal />
      <BattleRewards />
    </div>
  );
};
