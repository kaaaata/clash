import { CardsArray } from './CardsArray';
import { store } from '../stores/store';
import { startTurn } from './startTurn';
import { playCard } from './playCard';

export const playFirstCardInRound = (index) => {
  const _state = {
    clashBattleCards: store.getState().clashBattleCards,
    clashBattleStats: store.getState().clashBattleStats
  };
  const { clashBattleCards, clashBattleStats } = _state;
  const state = {
    you: {
      name: clashBattleStats.yourName,
      deck: CardsArray(clashBattleCards.yourDeck),
      discard: CardsArray(clashBattleCards.yourDiscard),
      banish: CardsArray(clashBattleCards.yourBanish),
      hand: CardsArray(clashBattleCards.yourHand),
      shields: clashBattleStats.yourShields,
      statBonuses: clashBattleStats.yourStatBonuses,
      stats: clashBattleStats.yourStats
    },
    enemy: {
      name: clashBattleStats.enemyName,
      deck: CardsArray(clashBattleCards.enemyDeck),
      discard: CardsArray(clashBattleCards.enemyDiscard),
      banish: CardsArray(clashBattleCards.enemyBanish),
      hand: CardsArray(clashBattleCards.enemyHand),
      shields: clashBattleStats.enemyShields,
      statBonuses: clashBattleStats.enemyStatBonuses,
      stats: clashBattleStats.enemyStats
    },
    stack: CardsArray(clashBattleCards.stack),
    winner: clashBattleStats.winner,
    logs: [],
    renderActions: []
  };
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!

  const card = state.you.hand[index];
  logs.push(`you plays: ${card.name}`);
  // any function that uses stateCopy should put its reference as the first arg
  playCard(state, card, 'you', 'hand', index);

  if (state.winner) {
    logs.push(`${state.winner} wins!`);
    renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
  } else {
    startTurn(state, 'enemy');
    if (state.winner) {
      logs.push(`${state.winner} wins!`);
      renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
    } else {
      const enemyHandRandomCardIndex = ~~(Math.random() * 3);
      const enemyHandRandomCard = state.enemy.hand[enemyHandRandomCardIndex];
      // add placeholder
      state.enemy.hand[enemyHandRandomCardIndex] = {};
      logs.push(`enemy plays: ${enemyHandRandomCard.name}`);
      playCard(state, enemyHandRandomCard, 'enemy', 'hand', enemyHandRandomCardIndex);
      if (state.winner) {
        logs.push(`${state.winner} wins!`);
        renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
      } else {
        startTurn(state, 'you');
        if (state.winner) {
          logs.push(`${state.winner} wins!`);
          renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
        }
      }
    }
  }

  console.log(logs.map(log => log.startsWith('you')
    ? `Player${log.slice(3)}`
    : `${state.enemy.name}${log.slice(5)}`
  ));

  return renderActions;
};
