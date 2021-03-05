import Datetimepicker from "./components/Datetimepicker";
import ListOfPlaces from "./components/ListOfPlaces";
import WeatherForecast from "./components/WeatherForecast";
import TrafficCam from "./components/TrafficCam";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [data, setData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState("null");

  const convertDateTime = (dateTime) => {
    const dateTimeData = dateTime
      .toLocaleString("en-SG", { hour12: false })
      .split(",", 2);
    console.log("date and time now is ", dateTimeData);
    const date = dateTimeData[0].split("/", 3).reverse().join("-");
    const time = dateTimeData[1].trim().split(":", 3).join("%3A");
    return `${date}T${time}`;
  };

  const getData = () => {
    const convertedDateTime = convertDateTime(dateTime);
    const URL = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${convertedDateTime}`;

    //sample URL for API request: https://api.data.gov.sg/v1/transport/traffic-images?date_time=2021-03-02T18%3A31%3A00

    console.log("URL to request", URL);

    axios
      .get(URL)
      .then((res) => {
        console.log("data", res.data.items[0].cameras);
        setData(res.data.items[0].cameras);
        setSelectedIndex("null");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectIndex = (event) => {
    console.log("handle select is called", event.target.value);
    const index = event.target.value;
    setSelectedIndex(index);
  };

  useEffect(() => {
    getData();
  }, [dateTime]);

  return (
    <div className="main">
      <Datetimepicker dateTime={dateTime} setDateTime={setDateTime} />
      <ListOfPlaces
        data={data}
        selectedIndex={selectedIndex}
        handleSelectIndex={handleSelectIndex}
      />
      <WeatherForecast
        selectedData={data[selectedIndex]}
        dateTime={dateTime}
        convertDateTime={convertDateTime}
      />
      <TrafficCam selectedData={data[selectedIndex]} />
    </div>
  );
};

export default App;
