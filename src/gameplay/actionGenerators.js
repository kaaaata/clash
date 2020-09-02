import { actionKeys } from './actionKeys';

export const actionGenerators = {
  // these functions mutate state and return actions.
  addCardToStack: (state, card) => {
    state.stack.addCardToTop(card);
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardNames()
    };
  },
  removeTopCardFromStack: (state) => {
    state.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardNames()
    };
  },
  addCard: (state, card, player, location, index) => {
    // index = number|'top'|'random'
    if (location === 'hand') {
      state[player][location][index] = card;
    } else if (index === 'top') {
      state[player][location].addCardToTop(card);
    } else if (index === 'random') {
      state[player][location].addCardAtRandomIndex(card);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardNames()
    };
  },
  removeCard: (state, player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (location === 'hand') {
      state[player][location][index] = {};
    } else if (index === 'top') {
      state[player][location].removeTopCard();
    } else {
      state[player][location].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: state[player][location].getCardNames()
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
