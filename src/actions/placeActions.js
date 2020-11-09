export const fetchPlaces = () => {
  return (dispatch) => {
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
