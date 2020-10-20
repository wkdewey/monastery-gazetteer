const placesReducer = (
  state = { places: [], ancestry_groups: [], loading: false },
  action
) => {
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
    case "LOADING_ANCESTRY_GROUPS":
      return {
        ...state,
        ancestry_groups: [...state.ancestry_groups],
        loading: true,
      };
    case "ADD_ANCESTRY_GROUPS":
      console.log("hit ADD_ANCESTRY_GROUPS in reducer");
      return {
        ...state,
        ancestry_groups: action.ancestry_groups,
        loading: false,
      };
    case "ADD_PLACE_ANCESTRY_GROUPS":
      return {
        ...state,
        place_ancestry_groups: action.ancestry_groups.map((ancestry_group) => {
          return { ancestry_group_id: ancestry_group.id, population: 0 };
        }),
      };
    default:
      return state;
  }
};

export default placesReducer;
