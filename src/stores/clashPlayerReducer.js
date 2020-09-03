import { startingDeck } from '../cards/startingDeck';
import { controller } from '../controller';

const genInitialState = () => ({
  gold: controller.gold || 25,
  goldBars: controller.goldBars || 0,
  deck: startingDeck
});

const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_GOLD':
      return {
        ...state,
        gold: Math.max(0, state.gold + action.payload)
      };
    case 'ADJUST_PLAYER_GOLD_BARS':
      return {
        ...state,
        goldBars: Math.max(0, state.goldBars + action.payload)
      };
    case 'ADD_CARDS_TO_COLLECTION':
      return {
        ...state,
        deck: typeof action.payload === 'string'
          ? [action.payload, ...state.deck]
          : [...action.payload, ...state.deck]
      };
    case 'REMOVE_CARDS_FROM_COLLECTION': {
      const newDeck = [...state.deck];
      const removeCards = typeof action.payload === 'string'
        ? [action.payload]
        : action.payload;
      removeCards.forEach(card => {
        const spliceIndex = newDeck.indexOf(card);
        if (spliceIndex !== -1) {
          newDeck.splice(spliceIndex, 1);
        }
      });
      return {
        ...state,
        deck: newDeck
      };
    }
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
