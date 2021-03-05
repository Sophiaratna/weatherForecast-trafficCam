const ListOfPlaces = ({ data, selectedIndex, handleSelectIndex }) => {
  console.log("data", data);
  console.log("selected Index", selectedIndex);
  return (
    <div>
      <h1>This will contain the list of places for selection</h1>
      <select
        onChange={(event) => handleSelectIndex(event)}
        value={selectedIndex}
      >
        <option disabled selected value="null">
          Pls select location here
        </option>
        {data.length > 0 &&
          data.map((el, index) => {
            return (
              <option
                value={index}
              >{`Latitude: ${el.location.latitude}; Longitude: ${el.location.longitude}`}</option>
            );
          })}
      </select>
    </div>
  );
};
export default ListOfPlaces;
