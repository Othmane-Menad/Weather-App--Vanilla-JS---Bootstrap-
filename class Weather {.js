class Weather {
  constructor() {
    this.apikey = "49812b";
  }

  // fetch weather from api using one API call
  getWeather = async (city) => {
    const coordResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apikey}`
    );

    const coordData = await coordResponse.json();
    const lat = coordData.data[0].lat;
    const lon = coordData.data[0].lon;

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${this.apikey}`
    );

    const weatherData = await weatherResponse.json();

    return weatherData;
  };
}
