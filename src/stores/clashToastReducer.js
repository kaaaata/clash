import { cards } from '../cards/cards';

const genInitialState = () => ({
  toast: '',
  flipper: false
});

const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOAST':
      return {
        ...state,
        toast: action.payload,
        flipper: !state.flipper
      };
    case 'ADJUST_PLAYER_GOLD':
      return {
        ...state,
        toast: `${action.payload > 0 ? 'Received' : 'Lost'}: ${Math.abs(action.payload)} gold`,
        flipper: !state.flipper
      };
    case 'ADD_CARDS_TO_COLLECTION': {
      const cardIds = typeof action.payload === 'string' ? [action.payload] : action.payload;
      const cardNames = cardIds.map(i => cards[i].name).join(', ');
      return {
        ...state,
        toast: `Received ${cardIds.length === 1 ? 'card' : 'cards'}: ${cardNames}`,
        flipper: !state.flipper
      };
    }
    case 'REMOVE_CARDS_FROM_COLLECTION': {
      const cardIds = typeof action.payload === 'string' ? [action.payload] : action.payload;
      const cardNames = cardIds.map(i => cards[i].name).join(', ');
      return {
        ...state,
        toast: `Removed ${cardIds.length === 1 ? 'card' : 'cards'}: ${cardNames}`,
        flipper: !state.flipper
      };
    }
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
