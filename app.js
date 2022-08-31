const input = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#search");
const modalBody = document.querySelector(".modal-body");
const weather = new Weather();
const ui = new UI();
// const storage = new STORAGE();
//get storage data

//hide result ui before searching
window.addEventListener("DOMContentLoaded", ui.hideData());

// an async func to get data
const getApiData = async (cityName) => {
  const coord = await weather.getCoord(cityName);
  // console.log(coord);
  // const city = await weather.getCityInfos(coord.lat, coord.lon);
  return coord;
};

let id = 0;
const cities = []; // to link every id with lat and lon

function getCityInfos() {
  const inputCityName = input.value.trim();
  if (inputCityName.length == 0) {
    window.alert("Please enter a City name");
    return false;
  }
  getApiData(inputCityName)
    .then((data) => {
      data.forEach((element) => {
        const city = {}; // need to be in the forEach to work
        city["id"] = id;
        city["lat"] = element.lat;
        city["lon"] = element.lon;
        cities.push(city);
        const link = document.createElement("a");
        link.className = "list-group-item list-group-item-action";
        link.id = `${id}`; //for selecting the right city object in return
        link.setAttribute("href", "#");
        link.setAttribute("data-bs-dismiss", "modal");
        link.ariaLabel = "modal";

        link.innerText = element.name + ",  " + element.country;
        modalBody.appendChild(link);
        id++;
      });
    })
    .catch((err) => console.log(err));
  input.value = "";
}

// function findId(cities, id) {
//   const foundId = cities.forEach((element) => {
//     if (element.id === parseInt(id)) return element;
//   });
// }
searchBtn.addEventListener("click", getCityInfos);
modalBody.addEventListener("click", modalexit);

//returning an object with lan and lon data

function modalexit(e) {
  const foundId = cities.find((element) => {
    return element.id === parseInt(e.target.id);
  });

  getData(foundId.lat, foundId.lon).then((element) => {
    ui.paint(element);
  });
  modalBody.innerHTML = "";

  e.preventDefault();
}

async function getData(lat, lon) {
  const data = await weather.getCityInfos(lat, lon);
  return data.daily[0];
}

// searchBtn.addEventListener("click", getCityInfos);

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
