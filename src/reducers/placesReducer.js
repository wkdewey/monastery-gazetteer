const placesReducer = (state = { places: [], loading: false }, action) => {
  console.log(`placesReducer called with action=${JSON.stringify(action)}`);
  switch (action.type) {
    case "LOADING_PLACES":
      return {
        ...state,
        places: [...state.places],
        loading: true,
      };
    case "ADD_PLACES":
      console.log("hit ADD_PLACES in reducer");
      return {
        ...state,
        places: action.places,
        loading: false,
      };
    case "ADD_PLACE":
      return {
        ...state,
        places: [...state.places, action.place],
        loading: false,
      };
    default:
      return state;
  }
};

export default placesReducer;
