export const fetchPlaces = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_PLACES" });
    fetch("http://localhost:3000/api/v1/places").then((response) => {
      console.log(response.json());
      return response.json();
    });
  };
};
