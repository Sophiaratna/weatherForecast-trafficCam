import areaMetadata from "../data/AreaMetadata";
import axios from "axios";
import { useEffect, useState } from "react";

const WeatherForecast = ({ dateTime, selectedData, convertDateTime }) => {
  console.log("weather forecast is called. selected data", selectedData);
  const [weatherData, setWeatherData] = useState({});
  const [weather, setWeather] = useState("");

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

  const findMinDistance = () => {
    const lat1 = selectedData.location.latitude;
    const lon1 = selectedData.location.longitude;
    const distArr = [];

    areaMetadata.map((el) => {
      const lat2 = el.label_location.latitude;
      const lon2 = el.label_location.longitude;
      distArr.push(getDistance(lat1, lon1, lat2, lon2));
    });

    const minIndex = distArr.indexOf(Math.min(...distArr));

    return areaMetadata[minIndex].name;
  };

  useEffect(() => {
    const convertedDateTime = convertDateTime(dateTime);
    console.log("dateTime", dateTime);
    const URL = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${convertedDateTime}`;
    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        console.log("weather data", res.data);
        setWeatherData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateTime]);

  useEffect(() => {
    //weather for minimum distance
    if (selectedData !== undefined) {
      const areaName = findMinDistance();
      console.log("area name", areaName);
      const findForecast = weatherData.items[0].forecasts.filter((el) => {
        return el.area === areaName;
      });
      console.log(findForecast);
      setWeather(findForecast[0].forecast);
    } else {
      setWeather("");
    }
  }, [selectedData]);

  return (
    <div>
      {weather !== "" && (
        <>
          <h1>Weather Forecast</h1>
          <h3>{weather}</h3>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
