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
    // .then(data => {
    // for (const key in data) {
    //    places.push({name: data[key]["attributes"]["name"],
    //    population: data[key]["attributes"]["population"],
    //    percent_german: data[key]["attributes"]["percent_german"],
    //    percent_african_american: data[key]["attributes"]["percent_african_american"],
    //    percent_mexican: data[key]["attributes"]["percent_mexican"]
    //   })
    // }
  };
};

export const addPlace = (place) => {
  return (dispatch) => {
    dispatch({ type: "POSTING_PLACE" });
    console.log(`in addPlace action`);
    console.log(dispatch);
    console.log(place);
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
        dispatch({ type: "ADD_ANCESTRY_GROUPS", ancestry_groups: json.data });
      });
  };
};
