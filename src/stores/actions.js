// clash
export const setYourDeck = payload => ({ type: 'SET_YOUR_DECK', payload });
export const setYourDiscard = payload => ({ type: 'SET_YOUR_DISCARD', payload });
export const setYourBanish = payload => ({ type: 'SET_YOUR_BANISH', payload });
export const setYourHand = payload => ({ type: 'SET_YOUR_HAND', payload });
export const setEnemyDeck = payload => ({ type: 'SET_ENEMY_DECK', payload });
export const setEnemyDiscard = payload => ({ type: 'SET_ENEMY_DISCARD', payload });
export const setEnemyBanish = payload => ({ type: 'SET_ENEMY_BANISH', payload });
export const setEnemyHand = payload => ({ type: 'SET_ENEMY_HAND', payload });
export const setStack = payload => ({ type: 'SET_STACK', payload });
export const setBattleRewardCards = payload => ({ type: 'SET_BATTLE_REWARD_CARDS', payload });
export const setBattleRewardGold = payload => ({ type: 'SET_BATTLE_REWARD_GOLD', payload });
export const setActiveModalCardPile = payload => ({ type: 'SET_ACTIVE_MODAL_CARD_PILE', payload });
export const setBattleLogs = payload => ({ type: 'SET_BATTLE_LOGS', payload });

export const setPlayer = payload => ({ type: 'SET_PLAYER', payload });
export const setEnemy = payload => ({ type: 'SET_ENEMY', payload });
export const setYourShields = payload => ({ type: 'SET_YOUR_SHIELDS', payload });
export const setEnemyShields = payload => ({ type: 'SET_ENEMY_SHIELDS', payload });
export const setStats = payload => ({ type: 'SET_STATS', payload });
export const setBattleInitialState = payload => ({ type: 'SET_BATTLE_INITIAL_STATE', payload });
export const setWinner = payload => ({ type: 'SET_WINNER', payload });

export const adjustPlayerLives = payload => ({ type: 'ADJUST_PLAYER_LIVES', payload });
export const setPlayerGold = payload => ({ type: 'SET_PLAYER_GOLD', payload });
export const adjustPlayerGold = payload => ({ type: 'ADJUST_PLAYER_GOLD', payload });
export const adjustPlayerGoldBars = payload => ({ type: 'ADJUST_PLAYER_GOLD_BARS', payload });
export const adjustPlayerEnergy = payload => ({ type: 'ADJUST_PLAYER_ENERGY', payload });
export const addCardsToCollection = payload => ({ type: 'ADD_CARDS_TO_COLLECTION', payload });
export const removeCardsFromCollection = payload => ({
  type: 'REMOVE_CARDS_FROM_COLLECTION', payload
});

export const setTownActionCompleted = payload => ({ type: 'SET_TOWN_ACTION_COMPLETED', payload });
export const setTownPurchasableCards = payload => ({ type: 'SET_TOWN_PURCHASABLE_CARDS', payload });
export const addTownFeedText = payload => ({ type: 'ADD_TOWN_FEED_TEXT', payload });
export const setBlessingReceived = payload => ({ type: 'SET_BLESSING_RECEIVED', payload });

export const setScene = payload => ({ type: 'SET_SCENE', payload });
export const startNewDay = payload => ({ type: 'START_NEW_DAY', payload });
export const setCanVisitShop = payload => ({ type: 'SET_CAN_VISIT_SHOP', payload });

export const setToast = payload => ({ type: 'SET_TOAST', payload });

export const resetGame = payload => ({ type: 'RESET_GAME', payload });
