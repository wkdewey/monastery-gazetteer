export const fetchAncestryGroups = () => {
  return (dispatch) => {
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
