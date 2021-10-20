import { useState } from "react";
import "./App.css";

const API = {
  key: "f9b0816c8c58cb1feba1c1dfaa685162",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [getQuery, setQuery] = useState("");
  const [getWeather, setWeather] = useState({});



  //call by getMonth or set by setMonth(value)
  const search = (event) => {
    if (event.key == "Enter") {
      console.log("Entered");
      fetch(`${API.base}weather?q=${getQuery}&units=metric&appid=${API.key}`)
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData);
          setWeather(resData);
        })
        .catch((err) => console.log(err));
    }
  };

  const dateBuilder = (d) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getWeatherIcon = () => {
    let path = "../img/";
    let temp = "";

    if(getWeather.weather[0].main === "Clouds"){
      temp = 'cloud-sun.svg';
    }else if(getWeather.weather[0].main === "Clear"){
      temp =  'sun.svg';
    }else if(getWeather.weather[0].main === "Rain"){
      temp =  'cloud-rain.svg';
    }else{
      temp = 'cloud-lightning.svg'; 
    }

    return path + temp;
  }

  return (
    <div className="App">
      
      <section className="head">
        <h1>WEATHER CHECKER</h1>
        <div className="search">
          <input
            type="text"
            name="location"
            className="location-input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={getQuery}
            onKeyPress={search}
          />
        </div>
        {(typeof getWeather.main != "undefined") ? (
        <div className="content">
          <div className="location">{getWeather.name}, {getWeather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="weather-icon"><img src={getWeatherIcon()} alt="" /></div>
            <div className="temp">{Math.round(getWeather.main.temp)}°c</div>
            <div className="weather">{getWeather.weather[0].main}</div>
          </div>
        </div>
        ) : ''}
      </section>
    </div>
  );
}

export default App;
