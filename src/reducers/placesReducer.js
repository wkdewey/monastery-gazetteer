const placesReducer = (state = { places: [], loading: false}, action) => {
  switch (action.type) {
    case "LOADING_PLACES":
      return {
        ...state,
        places: [...state.places],
        loading: true
      }
    case "ADD_PLACES":
      return {
        ...state,
        places: action.places,
        loading: false,
      }
    default:
      return state;
  }
};

export default placesReducer;
