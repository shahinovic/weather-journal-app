/* Global Variables */
const generateBtn = document.getElementById('generate');
const weatherIcon = document.querySelector('.weather-icon');

// configure open weather map api
const apiKey = '&appid=00585b61760fd73adda19977924807f7&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

const showData = async () => {
  const zip = document.getElementById('zip');
  const feel = document.getElementById('feelings').value;
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}${apiKey}`;
  const temp = await getWeatherData(weatherApi);
  const allData = {
    temp,
    date,
    feel
  };
  // call the function witch send data to local server
  sendData('/add', allData);
  retrieveData();
};

// fetching data from open weather map
const getWeatherData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const temp = await data.main.temp;
    return temp;
  } catch (err) {
    console.log(err);
  }
};

// send data to local server
const sendData = async (route, data) => {
  const res = await fetch(route, {
    method: 'post',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const serverData = await res.json();
    console.log(serverData);
  } catch (err) {
    console.log(err);
  }
};

// get data from local server
const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData.temp);
    // Write updated data to DOM elements
    // console.log(allData);
    if (allData.temp !== undefined) {
      document.getElementById('content').innerHTML = allData.feel;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
      if (allData.temp > 38) {
        weatherIcon.classList.add('sun');
        weatherIcon.classList.remove('cloud');
      } else {
        weatherIcon.classList.remove('sun');
        weatherIcon.classList.add('cloud');
      }
    } else {
      document.getElementById('temp').innerHTML = 'We need a valid Zipcode';
      document.getElementById('content').innerHTML = '';
      document.getElementById('date').innerHTML = '';
      weatherIcon.classList.remove('sun');
      weatherIcon.classList.remove('cloud');
    }
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// Add Event Listener when user click on generate button to listen
generateBtn.addEventListener('click', showData);
