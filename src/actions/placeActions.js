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

export function addPlace(place) {
  console.log(`in placeActions, place is ${place}`);
  return { type: "ADD_PLACE", place };
}
