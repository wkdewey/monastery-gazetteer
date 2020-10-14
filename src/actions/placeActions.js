export const fetchPlaces = () => {
  return (dispatch) => {
    let array = []
    dispatch({ type: "LOADING_PLACES" });
    return fetch("http://localhost:3000/api/v1/places").then((response) =>  response.json()).then(json => json["data"]).then(data => {
      for (const key in data) {
         array.push(data[key]["attributes"]["name"])
      }
      console.log(array)
      return array
    });
    };
  };
