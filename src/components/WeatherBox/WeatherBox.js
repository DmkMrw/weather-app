import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');

  const handleCityChange = useCallback(

    (city) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f0be450fb8b78e2e96c69f869195990&units=metric`)

        .then((res) => res.json())

        .then((data) => {

        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
          };

          setWeatherData(weatherData)
      });
    }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary weatherData={weatherData} />
      <Loader />
    </section>
  )
};

export default WeatherBox;