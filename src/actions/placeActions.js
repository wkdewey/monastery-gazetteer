export const fetchPlaces = () => {
  return (dispatch) => {
    let places = []
    dispatch({ type: "LOADING_PLACES" });
    return fetch("http://localhost:3000/api/v1/places").then((response) =>  response.json()).then(json => json["data"]).then(data => {
      for (const key in data) {
         places.push({name: data[key]["attributes"]["name"],
         population: data[key]["attributes"]["population"],
         percent_german: data[key]["attributes"]["percent_german"],
         percent_african_american: data[key]["attributes"]["percent_african_american"],
         percent_mexican: data[key]["attributes"]["percent_mexican"]
        })
      }
      console.log(places)
      return places
    });
    };
  };
