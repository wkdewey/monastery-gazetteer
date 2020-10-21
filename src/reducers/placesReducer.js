const placesReducer = (
  state = { places: [], ancestryGroups: [], loading: false },
  action
) => {
  switch (action.type) {
    case "LOADING_PLACES":
      return {
        ...state,
        places: [...state.places],
        loading: true,
      };
    case "ADD_PLACES":
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
        ancestryGroups: [...state.ancestryGroups],
        loading: true,
      };
    case "ADD_ANCESTRY_GROUPS":
      console.log("hit ADD_ANCESTRY_GROUPS in reducer");
      return {
        ...state,
        ancestryGroups: action.ancestryGroups,
        loading: false,
      };
    case "ADD_PLACE_ANCESTRY_GROUPS":
      return {
        ...state,
        placeAncestryGroups: action.ancestryGroups.map((ancestryGroup) => {
          return {
            ancestryGroupId: ancestryGroup.id,
            population: 0,
            ancestryGroupName: ancestryGroup.attributes.name,
          };
        }),
      };
    default:
      return state;
  }
};

export default placesReducer;
