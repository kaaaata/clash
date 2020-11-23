import { controller } from '../controller';

const genInitialState = () => ({
  yourDeck: controller.yourDeck || [],
  yourDiscard: controller.yourDiscard || [],
  yourBanish: controller.yourBanish || [],
  yourHand: controller.yourHand || [null, null, null],
  battleRewardCards: [],
  enemyDeck: controller.enemyDeck || [],
  enemyDiscard: controller.enemyDiscard || [],
  enemyBanish: controller.enemyBanish || [],
  enemyHand: controller.enemyHand || [null, null, null],
  stack: [],
  battleLogs: [],

  activeModalCardPile: null,
  isBattleLogVisible: false,
});

export default (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_YOUR_DECK':
      return {
        ...state,
        yourDeck: action.payload
      };
    case 'SET_YOUR_DISCARD':
      return {
        ...state,
        yourDiscard: action.payload
      };
    case 'SET_YOUR_BANISH':
      return {
        ...state,
        yourBanish: action.payload
      };
    case 'SET_YOUR_HAND':
      return {
        ...state,
        yourHand: action.payload
      };
    case 'SET_ENEMY_DECK':
      return {
        ...state,
        enemyDeck: action.payload
      };
    case 'SET_ENEMY_DISCARD':
      return {
        ...state,
        enemyDiscard: action.payload
      };
    case 'SET_ENEMY_BANISH':
      return {
        ...state,
        enemyBanish: action.payload
      };
    case 'SET_ENEMY_HAND':
      return {
        ...state,
        enemyHand: action.payload
      };
    case 'SET_STACK':
      return {
        ...state,
        stack: action.payload
      };
    case 'SET_BATTLE_REWARD_CARDS':
      return {
        ...state,
        battleRewardCards: action.payload
      };
    case 'SET_BATTLE_REWARD_GOLD':
      return {
        ...state,
        battleRewardGold: action.payload
      };
    case 'SET_BATTLE_INITIAL_STATE':
      return genInitialState();
    case 'SET_ACTIVE_MODAL_CARD_PILE':
      return {
        ...state,
        activeModalCardPile: action.payload
      };
    case 'SET_BATTLE_LOGS':
      return {
        ...state,
        battleLogs: action.payload
      };
    default:
      return state;
  }
};
