export const fetchPlaces = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_PLACES" });
    fetch("http://localhost:3000/api/v1/places")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({ type: "ADD_PLACES", places: json.data });
      });
  };
};

export const addPlace = (place) => {
  return (dispatch) => {
    dispatch({ type: "POSTING_PLACE" });
    fetch("http://localhost:3000/api/v1/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "ADD_PLACE", place: json.data });
      });
  };
};

export const fetchAncestryGroups = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_ANCESTRY_GROUPS" });
    fetch("http://localhost:3000/api/v1/ancestry_groups")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({ type: "ADD_ANCESTRY_GROUPS", ancestryGroups: json.data });
        dispatch({
          type: "ADD_PLACE_ANCESTRY_GROUPS",
          ancestryGroups: json.data,
        });
      });
  };
};
