import { createStore, combineReducers } from 'redux';
import clashToastReducer from './clashToastReducer';
import clashBattleCardsReducer from './clashBattleCardsReducer';
import clashBattleStatsReducer from './clashBattleStatsReducer';
import clashPlayerReducer from './clashPlayerReducer';
import clashTownReducer from './clashTownReducer';
import clashSceneReducer from './clashSceneReducer';

export const store = createStore(combineReducers({
  clashToast: clashToastReducer,
  clashBattleCards: clashBattleCardsReducer,
  clashBattleStats: clashBattleStatsReducer,
  // clashPlayer must come after clashToast, because clashPlayer does "delete cards[key];"
  // and both clashPlayer and clashToast need to reference "cards[key]".
  clashPlayer: clashPlayerReducer, 
  clashTown: clashTownReducer,
  clashScene: clashSceneReducer
}));
