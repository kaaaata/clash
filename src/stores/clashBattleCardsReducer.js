const genInitialState = () => ({
  yourDeck: [],
  yourDiscard: [],
  yourBanish: [],
  yourHand: [null, null, null],
  battleRewardCards: [],
  enemyDeck: [],
  enemyDiscard: [],
  enemyBanish: [],
  enemyHand: [null, null, null],
  stack: [],

  activeModalCardPile: null
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
    default:
      return state;
  }
};
