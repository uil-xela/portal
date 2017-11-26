var ApiKey = "rTK0iPw5TGWid3sVEx72dTq0LWa0g3n8";
var Lang = "zh-TW";
var WeatherIconBase = "https://developer.accuweather.com/sites/default/files/";

function onReceiveIpAddr() {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        //document.getElementById("ipaddr").innerHTML += res.ip;

        getLocationFromIp(res.ip);
    }
}

function onRecevieLocation() {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        //document.getElementById("locationkey").innerHTML += res.Key;
        document.getElementById("city").innerHTML += res.LocalizedName;

        getWeatherFromLocation(res.Key);
    }
}

function onReceiveWeather() {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res[0]);
        document.getElementById("weathertext").innerHTML += res[0].WeatherText;
        var iconIndex;
        if (res[0].WeatherIcon < 10)
            iconIndex = "0" + res[0].WeatherIcon;
        else
            iconIndex = res[0].WeatherIcon;
        document.getElementById("weatherimg").src = WeatherIconBase + iconIndex + "-s.png";
        document.getElementById("temperature").innerHTML += res[0].Temperature.Metric.Value + "C";
    }
}

function getIpAddr() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onReceiveIpAddr;
    xhr.open("GET", "https://api.ipify.org?format=json", true);
    xhr.send();
}

function getLocationFromIp(ip) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onRecevieLocation;      
    var url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + ApiKey + "&q=" + ip + "&language=" + Lang;
    xhr.open("GET", url, true);
    xhr.send();
}

function getWeatherFromLocation(location) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onReceiveWeather;
    var url = "http://dataservice.accuweather.com/currentconditions/v1/" + location + "?apikey=" + ApiKey + "&language=" + Lang;
    xhr.open("GET", url, true);
    xhr.send();
}

function updateClock() {
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth() + 1;
    var date = curTime.getDate();
    var h = curTime.getHours();
    var m = curTime.getMinutes();
    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    document.getElementById("clock").innerHTML = year + "." + month + "." + date + " " + h + ":" + m;
    setTimeout(updateClock, 1000 * 30);
}

function init() {
    getIpAddr();
    updateClock();
}
