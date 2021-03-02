import Datetimepicker from "./components/Datetimepicker";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [data, setData] = useState({});

  const getData = () => {
    const dateTimeData = dateTime.toLocaleString("en-SG").split(",", 2);
    const date = dateTimeData[0].split("/", 3).reverse().join("-");
    const time = dateTimeData[1].trim().split(":", 3).join("%3A").slice(0, -2);
    const URL = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date}T${time}`;
    //sample URL for API request: https://api.data.gov.sg/v1/transport/traffic-images?date_time=2021-03-02T18%3A31%3A00

    console.log("URL to request", URL);

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.items[0]);
        setData(res.data.items[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [dateTime]);

  return (
    <>
      <Datetimepicker dateTime={dateTime} setDateTime={setDateTime} />
    </>
  );
};

export default App;
