const input = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#search");
const weather = new Weather();
const ui = new UI();
// const storage = new STORAGE();
//get storage data

//hide result ui before searching
window.addEventListener("DOMContentLoaded", ui.hideData());

// an async func to get data
const getApiData = async (cityName) => {
  const coord = await weather.getCoord(cityName);

  const city = await weather.getCityInfos(coord.lat, coord.lon);
  return city;
};

const getCityInfos = () => {
  const inputCityName = input.value.trim();
  if (inputCityName.length == 0) {
    window.alert("Please enter a City name");
    return false;
  }
  getApiData(inputCityName)
    .then((data) => {
      ui.paint(data);
    })
    .catch((err) => console.log(err));
  input.value = "";
};

searchBtn.addEventListener("click", getCityInfos);

// const addList = () => {
//   const weather = new Weather(input.value);
//   const coord = weather.getCoord();
//   coord.then((data) => {
//     data.forEach((element) => {
//       const link = document.createElement("A");
//       link.className = "list-group-item list-group-item-action";
//       link.id = "link";
//       link.setAttribute("href", "#");
//       link.setAttribute("data-bs-dismiss", "modal");
//       link.ariaLabel = "modal";

//       link.innerText = element.name + ",  " + ", " + element.country;
//       modalList.appendChild(link);
//     });
//   });
// };

// searchBtn.addEventListener("click", addList);

// const resetMod = () => {
//   modalList.innerText = "";
// };

// resetModal.addEventListener("click", resetMod);

// const selectCity = () => {};

// ----- search with dropdown list -----
// const search = document.querySelector("#search");
// const matchlist = document.querySelector("#match_list");

// const getData = async (searchText) => {

//   const response = await fetch(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${searchcity}&limit=5&appid=b0826b599d1620588f27d2e4b349812b`
//   );
//   const responseData = await response.json();
//   // return responseData;
//   // console.log(responseData);
//   let matches = responseData.filter((city) => {
//     const regex = new RegExp(`^${searchText}`, "gi");
//     return city.name.match(regex) || city.state.match(regex);
//   });
//   // console.log(matches);
// };

// search.addEventListener("input", getData(search.value));
