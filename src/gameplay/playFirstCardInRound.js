import { CardIdsArray } from './CardIdsArray';
import { store } from '../stores/store';
import { startTurn } from './startTurn';
import { playCard } from './playCard';
import { logPlayCard, logPlayerWins } from './battleLogGenerators';
import { cards } from '../cards/cards';
import { selectEnemyCardToPlay } from './selectEnemyCardToPlay';
import { createNewCard } from '../cards/createNewCard';
import { blueprints } from '../cards/blueprints';
import shortid from 'shortid';

const inDevelopment = process.env.NODE_ENV !== 'production';

export const playFirstCardInRound = (index, isRogueSpecialAbility) => {
  const clashBattleCards = store.getState().clashBattleCards;
  const clashBattleStats = store.getState().clashBattleStats;

  // don't mutate state, unless through an actionGenerator.
  // exception: OK to mutate state.winner, so playCard can return prematurely.
  const state = {
    you: {
      name: clashBattleStats.yourName,
      deck: CardIdsArray(clashBattleCards.yourDeck),
      discard: CardIdsArray(clashBattleCards.yourDiscard),
      banish: CardIdsArray(clashBattleCards.yourBanish),
      hand: CardIdsArray(clashBattleCards.yourHand),
      shields: clashBattleStats.yourShields,
      statBonuses: clashBattleStats.yourStatBonuses,
      stats: clashBattleStats.yourStats
    },
    enemy: {
      name: clashBattleStats.enemyName,
      deck: CardIdsArray(clashBattleCards.enemyDeck),
      discard: CardIdsArray(clashBattleCards.enemyDiscard),
      banish: CardIdsArray(clashBattleCards.enemyBanish),
      hand: CardIdsArray(clashBattleCards.enemyHand),
      shields: clashBattleStats.enemyShields,
      statBonuses: clashBattleStats.enemyStatBonuses,
      stats: clashBattleStats.enemyStats
    },
    stack: CardIdsArray(clashBattleCards.stack),
    winner: clashBattleStats.winner,
    logs: [],
    renderActions: []
  };
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!

  const cardId = isRogueSpecialAbility
    ? createNewCard('Knife', `battle_${shortid.generate()}`)
    : state.you.hand[index];
  logs.push(logPlayCard(
    `you plays: ${cards[cardId].name} (${cardId})`,
    'you',
    cardId
  ));
  // any function that uses stateCopy should put its reference as the first arg
  playCard(
    state,
    cardId,
    'you',
    isRogueSpecialAbility ? null : { player: 'you', location: 'hand', index }
  );

  if (state.winner) {
    logs.push(logPlayerWins(
      `${state.winner} wins!`,
      state.winner
    ));
    renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
  } else {
    if (!isRogueSpecialAbility) {
      startTurn(state, 'enemy');
      if (state.winner) {
        logs.push(logPlayerWins(
          `${state.winner} wins!`,
          state.winner
        ));
        renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
      } else {
        const enemyHandRandomCardId = selectEnemyCardToPlay(state.enemy.hand);
        const enemyHandRandomCardIndex = state.enemy.hand.indexOf(enemyHandRandomCardId);
        // add placeholder
        state.enemy.hand[enemyHandRandomCardIndex] = null;
        logs.push(logPlayCard(
          `enemy plays: ${cards[enemyHandRandomCardId].name} (${enemyHandRandomCardId})`,
          'enemy',
          enemyHandRandomCardId
        ));
        playCard(
          state,
          enemyHandRandomCardId,
          'enemy',
          { player: 'enemy', location: 'hand', index: enemyHandRandomCardIndex }
        );
        if (state.winner) {
          logs.push(logPlayerWins(
            `${state.winner} wins!`,
            state.winner
          ));
          renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
        } else {
          startTurn(state, 'you');
          if (state.winner) {
            logs.push(logPlayerWins(
              `${state.winner} wins!`,
              state.winner
            ));
            renderActions.push([{ actionKey: 'setWinner', payload: state[state.winner].name }]);
          }
        }
      }
    }
  }

  if (inDevelopment) {
    // console.log(logs.map(log => log.consoleLog.startsWith('you')
    //   ? `Player${log.consoleLog.slice(3)}`
    //   : `${state.enemy.name}${log.consoleLog.slice(5)}`
    // ));
    console.log('card objects in memory:', Object.keys(cards).length);
  }

  renderActions[renderActions.length - 1].push({ actionKey: 'setBattleLogs', payload: logs });

  return renderActions;
};
