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
let dateTime= document.getElementById('dateTime5');
let weatherData = [];
let forecastData = [];
let populateW=document.getElementById('populateW');
let imgIcon = document.getElementById('imgIcon')

if(localStorage.getItem('ANAKIN')){
    weatherData=JSON.parse(localStorage.getItem('ANAKIN'));
    //console.log(weatherData);
    getCity(weatherData[weatherData.length-1].url);
}

////-------------------------------------------//
//-------------Add Event Listeners------------//
getW.addEventListener('click', function (e) {
    let getW = document.getElementById('loadWeather');
    let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    let url_city_pt2 = inputCity.value;
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


    if(inputCity.value = null){
        alert("Enter a valid city");
    };
    //saveData();
    //console.log(getWeather);
    //populateWeather();


});

inputCity.addEventListener('keypress', function (e) {
    if (e.code == "Enter") {
        //let getW = document.getElementById('loadWeather');
        let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q="
        let url_city_pt2 = inputCity.value;
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
        if(inputCity.value = ""){
            alert("Enter a valid city");
        };        //saveData();
       // populateWeather();

    }
});




//---------Load Your JSON Weather File--------//

function fivedayCast(URL){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);

            let obj = {
                name:myArr.name,
                temp:myArr.list[0].main.temp,
                temp_min:myArr.list[0].main.temp_low,
                temp_max:myArr.list[0].main.temp_max,
                url: URL
            }
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
                name:myArr.name,
                temp:myArr.main.temp,
                temp_min:myArr.main.temp_min,
                temp_max:myArr.main.temp_max,
                // weatherIcon:myArr.weather.icon
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

function getForecast(info){
    console.log(info);
    temp1.innerText=`Temperature: ${info.list[0].main.temp}`;
    tempLow1.innerText=info.list[0].main.temp_min;
    tempHigh1.innerText=info.list[0].main.temp_max;
    cityName1.innerText=`City: ${info.city.name}`;


}

function getWeather(info) {
    console.log(info);
    temp.innerText=`Temperature: ${info.main.temp}`;
    tempLow.innerText=info.main.temp_min;
    tempHigh.innerText=info.main.temp_max;
    cityName.innerText=`City: ${info.name}`;

    populateW.innerHTML = '';
    for (let weather of weatherData){
        let row = document.createElement('div');
        let col1 = document.createElement('div');
        let header1 = document.createElement('h1');
        let button = document.createElement('button')
        let day1Pick = document.getElementById('day1Pick');
    
        row.setAttribute('class','row');
        col1.setAttribute('class', 'col-lg-12 col-sm-12 border bgCity');
        button.setAttribute('class','btn btn-danger float-right mt-2')
        day1Pick.setAttribute('src','http://openweathermap.org/img/wn/'+info.weather[0].icon+'@2x.png');
    
        header1.innerText=`${info.name}`
    
        header1.innerText=weather.name+" Temperature: "+weather.temp+"°"+" "+weather.temp_min+" "+weather.temp_max;
        button.innerText="Delete";
        header1.addEventListener('click',function(e){

        })
    
        col1.appendChild(header1);
        header1.appendChild(button);
        row.appendChild(col1);
        
    
        populateW.appendChild(row);
    }


}

// function populateWeather(){

//     // <div class="row">
//     //             <div class="col-lg-12 col-sm-12">
//     //                 <h1 class="border">
//     //                     <div class="div bgCity">
//     //                         Places You Have Looked at
//     //                         <button type="button" class="btn btn-danger pt-3 float-right">delete</button>
//     //                 </h1>
//     //             </div>
//     //         </div>

//     populateW.innerHTML = '';
//     let row = document.createElement('div');
//     let col1 = document.createElement('div');
//     let header1 = document.createElement('h1');
//     let tempP = document.createElement('p');
//     let tempL = document.createElement('p');
//     let tempH = document.createElement('p');

// }


function saveData(){
    localStorage.setItem('ANAKIN',JSON.stringify(weatherData));
}
