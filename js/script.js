///------load your variables for all to use-------//

let getW = document.getElementById('loadWeather');
// let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q="
// // let url_city_pt2 = "tokyo";
// let url_temp_pt3 = "&units=imperial";
// let url_key_pt4 = "&appid=654ebb3710a1c1d07dfb4af00b7ba46d";
let inputCity = document.getElementById('inputCity');
// let fullUrl = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
let temp = document.getElementById('temp');
let cityName = document.getElementById('cityName');
let tempLow = document.getElementById('tempLow');
let tempHigh = document.getElementById('tempHigh');
let temp1 = document.getElementById('temp1');
let cityName1 = document.getElementById('cityName1');
let tempLow1 = document.getElementById('tempLow1');
let tempHigh1 = document.getElementById('tempHigh1');
let temp2 = document.getElementById('temp2');
let cityName2 = document.getElementById('cityName2');
let tempLow2 = document.getElementById('tempLow2');
let tempHigh2 = document.getElementById('tempHigh2');
let temp3 = document.getElementById('temp3');
let cityName3 = document.getElementById('cityName3');
let tempLow3 = document.getElementById('tempLow3');
let tempHigh3 = document.getElementById('tempHigh3');
let temp4 = document.getElementById('temp4');
let cityName4 = document.getElementById('cityName4');
let tempLow4 = document.getElementById('tempLow4');
let tempHigh4 = document.getElementById('tempHigh4');
let temp5 = document.getElementById('temp5');
let cityName5 = document.getElementById('cityName5');
let tempLow5 = document.getElementById('tempLow5');
let tempHigh5 = document.getElementById('tempHigh5');
let dateTime = document.getElementById('dateTime5');
let weatherData = [];
let forecastData = [];
let populateW = document.getElementById('populateW');
let imgIcon = document.getElementById('imgIcon')
let user;
let check;
let dateZone = document.getElementById('dateZone');
let dateZone1 = document.getElementById('dateZone1');
let dateZone2 = document.getElementById('dateZone2');
let dateZone3 = document.getElementById('dateZone3');
let dateZone4 = document.getElementById('dateZone4');
let dateZone5 = document.getElementById('dateZone5');
let currentDay = new Date();

if (localStorage.getItem('ANAKIN')) {
    weatherData = JSON.parse(localStorage.getItem('ANAKIN'));
    console.log(weatherData);
    getCity(weatherData[weatherData.length - 1].url);
}
if (localStorage.getItem('Vicodin')) {
    forecastData = JSON.parse(localStorage.getItem('Vicodin'));
    console.log(forecastData);
    loadCast(forecastData[forecastData.length - 1].url);
}
////-------------------------------------------//
//-------------Add Event Listeners------------//
getW.addEventListener('click', function (e) {
    user = inputCity.value.toUpperCase();
    if (weatherData.length > 0) {
        for (let i = 0; i < weatherData.length; i++) {
            check = weatherData[i].name.toUpperCase();
            if (check == user) {
                alert("This city exist");
                return;
            } else {
                url_city_pt2 = inputCity.value;
            }
        }
    }
    else {
        url_city_pt2 = inputCity.value;
    }

    let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    //let url_city_pt2=inputCity.value;
    let url_temp_pt3 = "&units=imperial";
    let url_key_pt4 = "&appid=654ebb3710a1c1d07dfb4af00b7ba46d";
    let fullUrl = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    newCity(fullUrl);
    let urlpt_1 = "https://api.openweathermap.org/data/2.5/forecast?q=";
    let urlpt_2 = inputCity.value;
    let urltemp_3 = "&units=imperial";
    let urlkey_4 = "&appid=654ebb3710a1c1d07dfb4af00b7ba46d";
    let foreCast = urlpt_1 + urlpt_2 + urltemp_3 + urlkey_4;
    fivedayCast(foreCast);


    if (inputCity.value = null) {
        alert("Enter a valid city");
    };
});

//---------Load Your JSON Weather File--------//

function fivedayCast(URL) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);

            let obj = {
                dates:myArr.list[0].dt_txt,
                url: URL
            }
            console.log(obj);
            forecastData.push(obj);
            saveData();
            getForecast(myArr);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}

function newCity(URL) {
    let xmlhttp = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    //let url = "";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);

            let obj = {
                name: myArr.name,
                temp: myArr.main.temp,
                temp_min: myArr.main.temp_min,
                temp_max: myArr.main.temp_max,
                url: URL
            }
            weatherData.push(obj);
            saveData();
            getWeather(myArr);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}

function newthingy(URL1, URL2) {
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getWeather(myArr);
        }
    };
    xmlhttp2.open("GET", URL1, true);
    xmlhttp2.send();


    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getForecast(myArr);
        }
    };
    xmlhttp.open("GET", URL2, true);
    xmlhttp.send();
}
function getCity(URL) {
    let xmlhttp = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    //let url = "";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getWeather(myArr);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}

function loadCast(URL) {
    let xmlhttp = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    //let url = "";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getForecast(myArr);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}


function getForecast(info) {
//    console.log((info.list[0].dt_txt).spilt(" "));
let dates = [];
 dates = info.list[0].dt_txt;//.spilt(" ");
let date = dates.split(" ");
 //console.log(date[0]);//.split(" ");
    temp1.innerText = `Temperature: ${info.list[0].main.temp}`;
    tempLow1.innerText = `Min Temperature: ${info.list[0].main.temp_min}`;
    tempHigh1.innerText = `Max Temperature: ${info.list[0].main.temp_max}`;
    cityName1.innerText = `City: ${info.city.name}`;

    temp2.innerText = `Temperature: ${info.list[8].main.temp}`;
    tempLow2.innerText = `Min Temperature: ${info.list[8].main.temp_min}`;
    tempHigh2.innerText = `Max Temperature: ${info.list[8].main.temp_max}`;
    cityName2.innerText = `City: ${info.city.name}`;

    temp3.innerText = `Temperature: ${info.list[16].main.temp}`;
    tempLow3.innerText = `Min Temperature: ${info.list[16].main.temp_min}`;
    tempHigh3.innerText = `Max Temperature:${info.list[16].main.temp_max}`;
    cityName3.innerText = `City: ${info.city.name}`;

    temp4.innerText = `Temperature: ${info.list[24].main.temp}`;
    tempLow4.innerText = `Min Temperature: ${info.list[24].main.temp_min}`;
    tempHigh4.innerText = `Max Temperature:${info.list[24].main.temp_max}`;
    cityName4.innerText = `City: ${info.city.name}`;

    temp5.innerText = `Temperature: ${info.list[37].main.temp}`;
    tempLow5.innerText = `Min Temperature: ${info.list[37].main.temp_min}`;
    tempHigh5.innerText = `Max Temperature:${info.list[37].main.temp_max}`;
    cityName5.innerText = `City: ${info.city.name}`;
    //console.log(info.list[37].dt_txt.split(" ")[0])

    dateZone1.innerText = date[0];//info.list[0].dt_txt.spilt(" ");
    dateZone2.innerText=info.list[8].dt_txt.split(" ")[0];
    dateZone3.innerText=info.list[16].dt_txt.split(" ")[0];
    dateZone4.innerText=info.list[24].dt_txt.split(" ")[0];
    dateZone5.innerText=info.list[37].dt_txt.split(" ")[0];

}

function getWeather(info) {
    console.log(info);
    temp.innerText = `Temperature: ${info.main.temp}`;
    tempLow.innerText = `Min Temperature: ${info.main.temp_min}`;
    tempHigh.innerText = `Max Temperature: ${info.main.temp_max}`;
    cityName.innerText = `City: ${info.name}`;
    dateZone.innerText=currentDay;

    populateW.innerHTML = '';
    for (let i = 0; i < weatherData.length; i++) {
        let row = document.createElement('div');
        let col1 = document.createElement('div');
        let header1 = document.createElement('h1');
        let deletebutton = document.createElement('button')
        let day1Pick = document.getElementById('day1Pick');
        let day2Pick = document.getElementById('day2Pick');
        let day3Pick = document.getElementById('day3Pick');
        let day4Pick = document.getElementById('day4Pick');
        let day5Pick = document.getElementById('day5Pick');
        let day6Pick = document.getElementById('day6Pick');
        let displayButton = document.createElement('button');


        row.setAttribute('class', 'row');
        col1.setAttribute('class', 'col-lg-12 col-sm-12 border bgCity');
        deletebutton.setAttribute('class', 'btn btn-danger float-right mt-2')
        deletebutton.setAttribute('id', `deleteHeader`);
        displayButton.setAttribute('class', 'btn btn-primary ml-5');

        day1Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');
        day2Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');
        day3Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');
        day4Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');
        day5Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');
        day6Pick.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '@2x.png');


        header1.innerText = `${info.name}`

        header1.innerText = weatherData[i].name + " Temperature: " + weatherData[i].temp + "°" + " " + weatherData[i].temp_min + " " + weatherData[i].temp_max;
        deletebutton.innerText = "Delete";
        displayButton.innerText = "Display Weather";

        displayButton.addEventListener('click', function (e) {
            console.log(forecastData);
            newthingy(weatherData[i].url, forecastData[i].url);
        });

        deletebutton.addEventListener('click', function (e) {
            weatherData.splice(i, 1);
            forecastData.splice(i, 1);
            localStorage.removeItem('Anakin');
            saveData();
            this.parentElement.parentElement.parentElement.remove();
        });
        // let deleteHeader = document.getElementById('deleteHeader');
        // deleteHeader.addEventListener('click',function(e){
        //     deleteHeader.parentNode.removeChild(deleteHeader);
        // });
        col1.appendChild(header1);
        header1.appendChild(deletebutton);
        header1.appendChild(displayButton);
        row.appendChild(col1);


        populateW.appendChild(row);
    }


}

function saveData() {
    localStorage.setItem('ANAKIN', JSON.stringify(weatherData));
    localStorage.setItem('Vicodin', JSON.stringify(forecastData));
}
