class Weather {
  constructor() {
    this.apikey = "b0826b599d1620588f27d2e4b349812b";
  }

  // fetch weather from api
  getCoord = async (city) => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apikey}`
    );

    const responseData = await response.json();

    return responseData[0];
  };

  getCityInfos = async (lat, lon) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}&units=imperial`
    );

    const responseData = await response.json();

    return responseData;
  };
}
