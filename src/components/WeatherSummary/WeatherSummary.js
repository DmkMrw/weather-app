import styles from './WeatherSummary.module.scss';

const WeatherSummary = (props) => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={props.weatherData.description}
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.weatherData.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{props.weatherData.city}</h2>
        <p>
          <strong>Temp:</strong> {props.weatherData.temp}°C
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;