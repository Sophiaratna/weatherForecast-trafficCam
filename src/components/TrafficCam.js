const TrafficCam = ({ selectedData }) => {
  console.log(selectedData);

  return (
    <div>
      {selectedData !== undefined && (
        <>
          <h1>Traffic cam</h1>
          <img src={selectedData.image} />
        </>
      )}
    </div>
  );
};

export default TrafficCam;
