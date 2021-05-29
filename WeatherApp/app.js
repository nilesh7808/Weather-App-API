const form = document.getElementById('form');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
let ul = document.getElementById('list');
const li = document.querySelectorAll('li');
const p1 = document.getElementById('special');

const getCityWeather = (citySearch) => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=b699a8cbf7827f5c96aa75c72a5d28c4`)
        .then(fetchedData => {
            return fetchedData.json();
        })
        .then(parsedData => {

            // state/city name that you're searching for and after that appending it to the para
            const State_Name = parsedData.name;
            const origin = parsedData.sys.country;
            p.append(State_Name + ", " + origin);

            var d = new Date();

            p1.append(d);

            // convert fahrenheit into celcius
            const c = Math.floor(parsedData.main.temp - 273.15);

            // degree unicode
            const deg = "\u00B0";

            // overall temperature with sign degree celcius
            const temperature = `${c} ${deg}C`;
            // append temperature to h1
            h1.append(temperature);


            // ul and lis
            const descript = parsedData.weather[0].description;
            let visible = parsedData.visibility;
            li[0].append(descript);
            // li[1].append(visible);

            let minmData = parsedData.main.temp_min;
            const minm = Math.floor(minmData - 273.15) + ` ${deg}C`;
            const maxmData = parsedData.main.temp_max;
            const maxm = "/ " + Math.floor(maxmData - 273.15) + ` ${deg}C`;
            li[1].append(minm);
            li[2].append(maxm);
        })

    .catch(err => {
        alert("Data Not available for this Country/City/State");
        console.log(err);
    })
    form.elements[0].value = "";

}

form.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(e);
        const citySearch = form.elements[0].value;
        // console.dir(form.elements[0].value);
        getCityWeather(citySearch);

    })
    // var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);