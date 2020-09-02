import { actionGenerators } from './actionGenerators';

export const startTurn = (state, player) => {
  const { logs, renderActions } = state;
  logs.push(`${player}'s turn begins`);

  const startOfTurnActions = [actionGenerators.setShields(state, player, 0)];
  for (let i = 0; i < 3; i++) {
    if (!state[player].hand[i].name) {
      const cardToDraw = state[player].deck.getTopCard();
      if (!cardToDraw) {
        logs.push(`${player} is unable to draw a card!`);
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
