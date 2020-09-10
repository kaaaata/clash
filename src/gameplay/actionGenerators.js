import { actionKeys } from './actionKeys';

export const actionGenerators = {
  // these functions mutate state and return actions.
  // actionKey = redux action key
  // payload = redux action payload
  // to be executed in <Battle>
  addCardToStack: (state, cardId) => {
    state.stack.addCardToTop(cardId);
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  removeTopCardFromStack: (state) => {
    state.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  addCard: (state, cardId, player, location, index) => {
    // index = number|'top'|'random'
    if (location === 'hand') {
      state[player][location][index] = cardId;
    } else if (index === 'top') {
      state[player][location].addCardToTop(cardId);
    } else if (index === 'random') {
      state[player][location].addCardAtRandomIndex(cardId);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardIds()
    };
  },
  removeCard: (state, player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (location === 'hand') {
      state[player][location][index] = null;
    } else if (index === 'top') {
      state[player][location].removeTopCard();
    } else {
      state[player][location].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardIds()
    };
  },
  setShields: (state, player, value) => {
    state[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setStats: (state, player, statBonuses) => {
    // statBonuses like { attack: 1, defense: 1 }
    Object.keys(statBonuses).forEach(stat => {
      state[player].statBonuses[stat] += statBonuses[stat];
    });
    return {
      actionKey: 'setStats',
      payload: {
        stats: statBonuses,
        type: 'bonuses',
        player,
        operation: 'set'
      }
    };
  }
};
