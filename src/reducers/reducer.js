const reducer = (state = { places: [], ancestryGroups: [] }, action) => {
  switch (action.type) {
    case "ADD_PLACES":
      return {
        ...state,
        places: action.places,
      };
    case "ADD_PLACE":
      return {
        ...state,
        places: [...state.places, action.place],
      };
    case "ADD_ANCESTRY_GROUPS":
      return {
        ...state,
        ancestryGroups: action.ancestryGroups,
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

export default reducer;
