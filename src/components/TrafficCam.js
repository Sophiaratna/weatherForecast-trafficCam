const TrafficCam = ({ selectedData }) => {
  console.log(selectedData);
  const image = selectedData.image;
  return (
    <div>
      <h1>Traffic cam here</h1>;
      {selectedData !== undefined && <img src={image} />}
    </div>
  );
};

export default TrafficCam;
