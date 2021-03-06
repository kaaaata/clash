// for coding simplicity, stats can only go up (can't lose stats). (may change in the future)
const genInitialState = () => ({
  // persisted variables
  yourName: '',
  yourImage: '',
  yourStats: { attack: 0, magic: 0, defense: 0 },
  yourStatBonuses: { attack: 0, magic: 0, defense: 0 },
  maxVBars: 3,
  maxSpecialAbilityBars: null,

  // will be reset before each fight
  enemyName: '',
  enemyImage: '',
  enemyStats: { attack: 0, magic: 0, defense: 0 },
  enemyStatBonuses: { attack: 0, magic: 0, defense: 0 },
  enemyType: null,
  isEnemyElite: false,
  enemyShields: 0,
  yourShields: 0,
  winner: null,
  winnerImage: null,
  specialAbility: null,
  specialAbilityBars: null,
  vBars: 3,
  isAnimating: false
});

export default (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        yourName: action.payload.name,
        yourImage: action.payload.image,
        specialAbility: action.payload.specialAbility,
        maxSpecialAbilityBars: action.payload.specialAbility.uses
      };
    case 'SET_ENEMY':
      return {
        ...state,
        enemyName: action.payload.name,
        enemyImage: action.payload.image,
        enemyType: action.payload.type,
        isEnemyElite: action.payload.isEnemyElite
      };
    case 'SET_YOUR_SHIELDS':
      return {
        ...state,
        yourShields: action.payload
      };
    case 'SET_ENEMY_SHIELDS':
      return {
        ...state,
        enemyShields: action.payload
      };
    case 'SET_STATS': {
      const {
        stats, // { attack, magic, defense } Number|undefined
        type, // 'stats'|'bonuses'
        player, // 'you'|'enemy'
        operation // 'set'|'adjust'
      } = action.payload;
      const { attack, magic, defense } = stats;
      const key = `${player === 'you' ? 'your' : 'enemy'}${type === 'stats' ? 'Stats' : 'StatBonuses'}`;
      
      return {
        ...state,
        [key]: {
          attack: typeof attack === 'number'
            ? operation === 'set' ? attack : state[key].attack + attack
            : state[key].attack,
          magic: typeof magic === 'number'
            ? operation === 'set' ? magic : state[key].magic + magic
            : state[key].magic,
          defense: typeof defense === 'number'
            ? operation === 'set' ? defense : state[key].defense + defense
            : state[key].defense
        },
      };
    }
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
        winnerImage: action.payload === state.yourName ? state.yourImage : state.enemyImage
      };
    case 'ACTIVATE_SPECIAL_ABILITY':
      return {
        ...state,
        specialAbilityBars: state.specialAbilityBars - 1
      };
    case 'ACTIVATE_V_TRIGGER':
      return {
        ...state,
        vBars: state.vBars - 1
      };
    case 'INCREMENT_MAX_SPECIAL_ABILITY_BARS':
      return {
        ...state,
        maxSpecialAbilityBars: state.maxSpecialAbilityBars + 1
      };
    case 'INCREMENT_MAX_VBARS':
      return {
        ...state,
        maxVBars: state.maxVBars + 1
      };
    case 'SET_IS_ANIMATING':
      return {
        ...state,
        isAnimating: action.payload
      };
    case 'SET_BATTLE_INITIAL_STATE':
      return {
        ...state,
        yourShields: 0,
        enemyShields: 0,
        winner: null,
        winnerImage: null,
        specialAbilityBars: state.maxSpecialAbilityBars,
        vBars: state.maxVBars,
        isAnimating: false
      };
    case 'START_NEW_DAY':
      return {
        ...state,
        yourStatBonuses: { attack: 0, magic: 0, defense: 0 },
        enemyStatBonuses: { attack: 0, magic: 0, defense: 0 },
      };
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
