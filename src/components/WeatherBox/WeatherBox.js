import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCityChange = useCallback(

    (city) => {
      setPending(true);
      setShowError(false);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f0be450fb8b78e2e96c69f869195990&units=metric`)

        .then(res => {
          if (res.status === 200) {
            return res.json()
              .then(data => {

                const weatherData = {
                  city: data.name,
                  temp: data.main.temp,
                  icon: data.weather[0].icon,
                  description: data.weather[0].main
                };
                setPending(false)
                setWeatherData(weatherData)
              });
          } else {
            setPending(false);
            setWeatherData('');
            setShowError(true);
          };
        });
    }, []);


  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weatherData  && pending===false) && <WeatherSummary weatherData={weatherData} />}
      {pending && <Loader />}
      {showError && <ErrorBox>Nie ma takiego miasta!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;