// api keys
const weatherAPI = 'e223c7dde3dec87d43af81ce7524bbf1';

// calling weather API
const callWeatherAPI = () => {
    const cityName = document.getElementById("city").value;
    document.getElementById("city").value = ''
    info.style.display = "none";

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}&units=metric `;
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            const lat = parseInt(data.coord.lat);
            const lon = parseInt(data.coord.lon);
            callTimezone(lat, lon);
            displayWeather(data);
        })
        .catch(error => console.log(error));
}

// call timezone api

const callTimezone = (lat, lon) => {
    // const time;
    const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=8UQXN3I26SRW&format=json&by=position&lat=${lat}.689247&lng=${lon}`;
    let time;
    fetch(timezoneUrl)
        .then(res => res.json())
        .then(data => formatTime(data.formatted))
        .catch(error => console.log(error));
}


// updating weather data
const info = document.getElementById("info");
info.classList.remove("d-flex", "flex-column", "align-items-center");
info.classList.add("d-none");

const displayWeather = (data) => {
    console.log(data);
    info.classList.remove("d-none");
    setTimeout(function () {
        info.classList.add("d-flex", "flex-column", "align-items-center");
    }, 1000);
    const { name, main } = data;
    const { temp, feels_like, temp_max, temp_min, humidity } = main;
    const { icon } = data.weather[0];
    const weatherDesc = data.weather[0].main;


    document.getElementById("weather-icon").innerHTML =
        `<img src = "http://openweathermap.org/img/wn/${icon}@2x.png"> </img>`;
    document.getElementById("weather-icon").dataset.weatherType = weatherDesc;
    document.getElementById("city-name").innerText = name;
    // document.getElementById("weather-type").innerText = weatherDesc;
    document.getElementById("temp").innerText = temp;
    document.getElementById("feels-like").innerText = feels_like;
    document.getElementById("max-temp").innerText = temp_max;
    document.getElementById("min-temp").innerText = temp_min;
    document.getElementById("humidity").innerText = humidity;
}

// format Time
const formatTime = (time) => {
    // getting only the time
    time = time.split(' ')[1];
    // dont want 24h format
    let hour = time.split(':')[0];
    let am = (hour < 12) ? true : false;
    hour = (hour < 12) ? hour : hour - 12;
    let minute = time.split(':')[1];
    displayTime(hour, minute, am)
}

// display Time
const displayTime = (hour, minute, am) => {
    document.getElementById("hour").innerText = `${hour}:`;
    document.getElementById("minute").innerText = `${minute} `;
    document.getElementById("am").innerText = (am) ? 'AM' : 'PM';

    const body = document.body;
    body.style.color = "white";
    if (am) {
        body.style.backgroundImage = "url('../assets/day.jpg')";
        body.style.backgroundPosition = `50% 20%`;
        body.style.backgroundSize = "cover"
    } else {
        body.style.backgroundImage = "url('../assets/night.webp')";
        body.style.backgroundSize = "auto";
    }
}

