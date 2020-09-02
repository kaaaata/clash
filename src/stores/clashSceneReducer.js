const genInitialState = () => ({
  scene: 'town',
  canVisitShop: true
});

const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        scene: action.payload
      };
    case 'START_NEW_DAY':
      return {
        ...state,
        scene: 'town'
      };
    case 'SET_CAN_VISIT_SHOP':
      return {
        ...state,
        canVisitShop: action.payload
      };
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
