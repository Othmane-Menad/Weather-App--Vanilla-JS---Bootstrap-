class Weather {
  constructor() {
    this.apikey = "b0826b599d1620588f27d2e4b349812b";
  }

  // fetch weather from api
  getCoord = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apikey}`
    );

    const responseData = await response.json();

    return responseData;
  };

  getCityInfos = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${this.apikey}`
      // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}&units=metric`
    );

    const responseData = await response.json();

    return responseData;
  };
}
