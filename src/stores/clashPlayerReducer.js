import { startingDeck } from '../cards/startingDeck';
import { controller } from '../controller';
import { cards } from '../cards/cards';

const genInitialState = () => ({
  lives: typeof controller.lives === 'number' ? controller.lives : 3,
  gold: typeof controller.gold === 'number' ? controller.gold : 25,
  goldBars: typeof controller.goldBars === 'number' ? controller.goldBars : 0,
  deck: startingDeck
});

const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_LIVES':
      return {
        ...state,
        lives: Math.max(0, Math.min(3, state.lives + action.payload))
      };
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
      removeCards.forEach(cardId => {
        const spliceIndex = newDeck.indexOf(cardId);
        if (spliceIndex !== -1) {
          newDeck.splice(spliceIndex, 1);
        }
        // delete cards[cardId];
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
