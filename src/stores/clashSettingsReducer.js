const genInitialState = () => ({
  
});

const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_BATTLE_INTERVAL_MS':
    //   return {
    //     ...state,
    //     battleIntervalMs: action.payload
    //   };
    default:
      return state;
  }
};
