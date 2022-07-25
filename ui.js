class UI {
  constructor() {
    this.cityName = document.querySelector("#cityName");
    this.desc = document.querySelector("#desc");
    this.feelsLike = document.querySelector("#feelsLike");
    this.humidity = document.querySelector("#humidity");
    this.wind = document.querySelector("#wind");
    this.icon = document.querySelector("#icon");
    this.temp = document.querySelector("#temp");
    this.time = document.querySelector("#time");
    this.result = document.querySelector("#result");
  }

  hideData = () => {
    this.result.style.display = "none";
  };

  displayData = () => {
    this.result.style.display = "block";
  };

  // func to calculate time
  dateBuilder = (timezone) => {
    const nowInLocalTime = Date.now() + 1000 * (timezone / 3600);

    const millitime = new Date(nowInLocalTime);
    const dateFormat = millitime.toLocaleString();

    let day = millitime.toLocaleString("en-US", { weekday: "long" });
    let month = millitime.toLocaleString("en-US", { month: "long" });
    let date = millitime.toLocaleString("en-US", { day: "numeric" });
    let year = millitime.toLocaleString("en-US", { year: "numeric" });
    let hours = millitime.toLocaleString("en-GB", { hour: "2-digit" });
    let minutes = millitime.toLocaleString("en-US", { minute: "2-digit" });

    return `${day} ${date} ${month} ${year}`;
  };

  paint = (data) => {
    this.displayData();
    this.cityName.textContent = data.name;
    this.desc.textContent = data.weather[0].description;
    this.temp.textContent = `${data.temp.day} °C`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/10n@2x.png`
    );
    // this.feelsLike.textContent = `Feels like: ${data.main.feels_like}`;
    this.humidity.textContent = `Humidity: ${data.humidity}`;
    this.wind.textContent = `Wind information: deg: ${data.wind_deg} | speed: ${data.wind_speed}`;
    this.time.textContent = `TIME: ${this.dateBuilder(data.dt)}`;
  };
}
