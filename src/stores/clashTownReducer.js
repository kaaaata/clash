import { genMonsterGoldReward } from '../monsters/genMonsterGoldReward';
import { genTownActions } from '../components/town/genTownActions';
import { genPurchasableCards } from '../components/town/genPurchasableCards';
import { monstersByTier, eventMonsters } from '../monsters/monsters';
import { sample } from 'lodash';

const genInitialState = () => {
  const dailyMonster = sample(monstersByTier[1]);

  return {
    energy: 0,
    day: 1,
    dailyMonster,
    // note: gold reward will be less if day is set thru Flow
    dailyMonsterGoldReward: genMonsterGoldReward(dailyMonster, false, 1),
    receivedBlessings: { 4: false, 7: false, 10: false },
    townActions: genTownActions(),
    purchasableCards: [],
    completedTownActions: {},
    feed: [
      'Welcome to town!',
      'You are too tired from your long journey to do anything else today.'
    ]
  };
};
const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_ENERGY':
      return {
        ...state,
        energy: action.payload
      };
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, Math.min(10, state.energy + action.payload))
      };
    case 'SET_DAY':
      return {
        ...state,
        day: action.payload
      };
    case 'START_NEW_DAY': {
      const newDay = state.day + 1;
      let dailyMonster;
      if (newDay <= 3) {
        dailyMonster = sample(monstersByTier[1]);
      } else if (newDay <= 6) {
        dailyMonster = sample(monstersByTier[2]);
      } else if (newDay <= 9) {
        dailyMonster = sample(monstersByTier[3]);
      } else if (newDay === 10) {
        dailyMonster = eventMonsters['Dragon'];
      }
      return {
        ...state,
        energy: 10,
        day: newDay,
        canDoRandomEvent: true,
        dailyMonster,
        dailyMonsterGoldReward: genMonsterGoldReward(
          dailyMonster,
          [3, 6, 9].includes(newDay),
          newDay
        ),
        receivedBlessings: { 4: false, 7: false, 10: false },
        townActions: genTownActions(),
        completedTownActions: {},
        feed: [
          'It\'s a new day.',
          action.payload.feedInitialMessage,
          [3, 6, 9].includes(newDay) && 'Tonight, an elite enemy will attack!',
          newDay === 10 && 'Tonight, the final boss will attack!'
        ].filter(Boolean)
      };
    }
    case 'ADD_TOWN_FEED_TEXT': {
      const newFeed = [...state.feed];
      if (typeof action.payload === 'string') {
        newFeed.push(action.payload);
      } else {
        action.payload.forEach(text => {
          newFeed.push(text);
        });
      }
      return {
        ...state,
        feed: newFeed
      };
    }
    case 'SET_TOWN_ACTION_COMPLETED':
      return {
        ...state,
        completedTownActions: {
          ...state.completedTownActions,
          [action.payload]: true
        }
      };
    case 'SET_TOWN_PURCHASABLE_CARDS':
      return {
        ...state,
        purchasableCards: genPurchasableCards(action.payload)
      };
    case 'SET_BLESSING_RECEIVED':
      return {
        ...state,
        receivedBlessings: {
          ...state.receivedBlessings,
          [state.day]: true
        }
      };
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
