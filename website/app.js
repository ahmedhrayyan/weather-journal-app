/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5";
const key = "9ae3f2e47559186adc02bb5b613b4679";
const localDataPath = "http://localhost:5000/project-data";
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contentHolder = document.getElementById("content");
const appForm = document.getElementById("appForm");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

function getWeather(baseUrl, zip = "94040,us", appid = key) {
  return fetch(`${baseUrl}/weather?zip=${zip}&appid=${key}`).then((res) =>
    res.json()
  );
}

function postLocalData(path, data) {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function getLocalData(path) {
  return fetch(path).then((res) => res.json());
}

async function updateUI(data = null) {
  if (!data) {
    data = await getLocalData(localDataPath);
  }
  dateHolder.textContent = data.date;
  tempHolder.textContent = data.temperature;
  contentHolder.textContent = data.userResponse;
}

function handleSubmit(evt) {
  evt.preventDefault();

  getWeather(baseUrl, zipInput.value)
    .then((temperature) => {
      return postLocalData(localDataPath, {
        date: newDate,
        temperature: temperature.main.temp,
        userResponse: feelingsInput.value,
      });
    })
    .then((res) => {
      updateUI(res.data);
    });
}

appForm.addEventListener("submit", handleSubmit);