import { actionGenerators } from './actionGenerators';
import { logTurnBegins, logCantDrawCard } from './battleLogGenerators';

export const startTurn = (state, player) => {
  const { logs, renderActions } = state;
  logs.push(logTurnBegins(
    `${player}'s turn begins`,
    player
  ));

  const startOfTurnActions = [actionGenerators.setShields(state, player, 0)];
  for (let i = 0; i < 3; i++) {
    if (!state[player].hand[i]) {
      const cardToDraw = state[player].deck.getTopCard();
      if (!cardToDraw) {
        logs.push(logCantDrawCard(
          `${player} is unable to draw a card!`,
          player
        ));
        state.winner = player === 'you' ? 'enemy' : 'you';
        return;
      }
      startOfTurnActions.push(actionGenerators.removeCard(state, player, 'deck', 'top'));
      startOfTurnActions.push(actionGenerators.addCard(state, cardToDraw, player, 'hand', i));
    }
  }

  renderActions.push(startOfTurnActions);
  renderActions.push([]);
};
