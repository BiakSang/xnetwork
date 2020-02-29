const hfGraph = '<svg viewbox="VIEWBOX" id="hf-graph"><path class="top-fill" d="" /><path class="graph-line" d="" /></svg>';
const dfGraph = '<svg viewbox="VIEWBOX" id="df-graph"><path class="top-fill" d="" /><path class="graph-line" d="" /></svg>';
const moreInfo = '<p><a href="https://www.iconfinder.com/kmgdesignid" target="_blank"><img src="assets/icons/wind-speed.svg" alt="wind speed icon" title="Icon by Iconfinder.com"></a><strong>Wind speed</strong><span>WINDSPEED mph</span></p><p><a href="https://www.iconfinder.com/kmgdesignid" target="_blank"><img src="assets/icons/humidity.svg" alt="humidity icon" title="Icon by Iconfinder.com"></a><strong>Humidity</strong><span>HUMIDITY%</span>span></p><p><a href="https://www.freeicons.io" target="_blank"><img src="assets/icons/visibility.svg" alt="visibility icon" title="Icon by Freeicons.io"></a><strong>Visibility</strong><span>VISIBILITY+ mi</span></p><p><a href="https://www.iconfinder.com/kmgdesignid" target="_blank"><img src="assets/icons/pressure.svg" alt="pressure icon" title="Icon by Iconfinder.com"></a><strong>Pressure</strong><span>PRESSURE mb</span></p><p><a href="https://www.iconfinder.com/kmgdesignid" target="_blank"><img src="assets/icons/dew-point.svg" alt="dew point icon" title="Icon by Iconfinder.com"></a><strong>Dew point</strong><span>DEWPOINT&deg;</span></p><p><a href="https://www.iconfinder.com/kmgdesignid" target="_blank"><img src="assets/icons/uv-index.svg" alt="uv index icon" title="Icon by Iconfinder.com"></a><strong>UV index</strong><span>UVINDEX</span></p>';
const icons = {
    "clear-day": {
        color: "orange"
    },
    "clear-night": {
        color: "#ddd"
    },
    "rain": {
        color: "#999"
    },
    "snow": {
        color: "#999"
    },
    "sleet": {
        color: "#999"
    },
    "wind": {
        color: "#999"
    },
    "fog": {
        color: "#999"
    },
    "cloudy": {
        color: "#999"
    },
    "partly-cloudy-day": {
        color: "#444"
    },
    "partly-cloudy-night": {
        color: "#ddd"
    },
    "hail": {
        color: "#999"
    },
    "thunderstorm": {
        color: "#999"
    },
    "tornado": {
        color: "#999"
    }
};

const weather = {
    data: null,
    scale: null,
    location: null,
    onload: () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                weather.getData(lat, lng);
            }, error => {
                alert("This page needs your location to display latest weather reports for your place. Please allow location access in your browser settings.");
            });
        }
        else {
            alert("Sorry your browser doesn't support HTML5 Geolocation! So you can't use this page.");
        }
    },
    getData: (lat, lng) => {
        if (Storage !== undefined){
            ///if browser supports localstorage
            let w = localStorage.getItem("weather");
            if (w){
                w = JSON.parse(w);
                weather.data = w;
                weather.loadTodaysData(w);
                weather.loadHourlyForecast(w.hourly.data);
                weather.loadDailyForecast(w.daily.data);
            }
            
            let l = localStorage.getItem("location");
            if (l){
                weather.location = l;
                $("#location").html(l);
            }
        }
        
        const darkSky = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7bd23d403e170a31c344b7d9e629e97a/${lat},${lng}`;
        const locationIQ = `https://eu1.locationiq.com/v1/reverse.php?key=fb31d5caa33bcc&lat=${lat}&lon=${lng}&format=json`;
        
        $.get(darkSky, res => {
            weather.data = res;
            
            weather.loadTodaysData(weather.data);
            weather.loadHourlyForecast(weather.data.hourly.data);
            weather.loadDailyForecast(weather.data.daily.data);
            localStorage.setItem("weather", JSON.stringify(weather.data));
        });
        
        $.get(locationIQ, res => {
            const address = res.address;
            weather.location = address.country;
            if (address.province){
                weather.location = address.province;
            }
            if (address.state){
                weather.location = address.state;
            }
            if (address.state_district){
                weather.location = address.state_district;
            }
            
            localStorage.setItem("location", weather.location);
            
            $("#location").html(weather.location);
        });
    },
    loadTodaysData: (data) => {
        const day = moment(data.currently.time * 1000).format("dddd");
        const date = moment(data.currently.time * 1000).format("LL");
        const windSpeed = data.currently.windSpeed;
        const humidity = data.currently.humidity;
        const visibility = data.currently.visibility;
        const pressure = data.currently.pressure;
        const dewPoint = data.currently.dewPoint;
        const uvIndex = data.currently.uvIndex;
        
        let temperature;
        if (weather.scale === "c"){
            temperature = Math.floor((data.currently.temperature - 32) * (5/9)) + "&deg; C";
        }
        else if (weather.scale === "f"){
            temperature = Math.floor(data.currently.temperature) + "&deg; F";
        }
        
        $("#date").html(`${day}, ${date}`);
        $("#temperature h1").html(temperature);
        $("#temperature p").html(data.currently.summary);
        $("#summary").html(data.hourly.summary);
        $("#more-info").html(
            moreInfo
            .split("WINDSPEED")
            .join(windSpeed)
            .split("HUMIDITY")
            .join(humidity)
            .split("VISIBILITY")
            .join(visibility)
            .split("PRESSURE")
            .join(pressure)
            .split("DEWPOINT")
            .join(dewPoint)
            .split("UVINDEX")
            .join(uvIndex)
        );
        
        weather.setTodayIcon(data.currently.icon);
    },
    loadHourlyForecast: (data) => {
        let newList = [];
        for (let i = 0; i < data.length; i+=3){
            newList.push(data[i]);
        }
        data = newList;
        
        const tempIAS = temperature => {
            ///temperature in accurate scale
            if (weather.scale === "c"){
                return (temperature - 32) * (5/9);
            }
            else if (weather.scale === "f"){
                return temperature
            }
        }
        
        const gnl = () => {
            ///gnl means greatest and least degree
            let list = [];
            for (let i = 0; i < data.length; i++){
                list.push(tempIAS(data[i].temperature));
            }
            list = list.sort((a,b) => b-a);
            
            return {
                g: list[0],
                l: list[list.length-1]
            }
        };
        const g = gnl().g;
        const l = gnl().l;
        const h = (g-l) + 20;
        
        $("#hourly-forecast section").html(
            hfGraph
            .split("VIEWBOX")
            .join(`0 0 170 ${h}`)
        );
        
        const line = '<line class="line" x1="LEFT" y1="TOP" x2="LEFT" y2="BOTTOM" />';
        $("#hf-graph .line").remove();
        for (let i = 1; i < data.length; i++){
            const x = (i * 10);
            const t = tempIAS(data[i].temperature);
            const y = (g - t) + 10;
            const y2 = h - 7;
            
            $("#hf-graph").html(
                $("#hf-graph").html() +
                line
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("BOTTOM")
                .join(y2)
            );
        }
        
        let graphLine = "";
        let firstPoint = null;
        for (let i = 0; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperature);
            const y = (g - t) + 10;
            if (i === 0){
                firstPoint = `T0,${y}`;
                graphLine += `M0,${y} `;
            }
            else if (i === 1){
                graphLine += `Q5,${y+1} ${x},${y} `
            }
            else if (i > 1 && i !== data.length-1) {
                graphLine += `T${x},${y} `;
            }
            else {
                graphLine += `T${x},${y} T${x+10},${y}`;
            }
        }
        $("#hf-graph .graph-line").attr("d", graphLine);
        
        const topFill = `${graphLine} T170,0 T0,0 ${firstPoint}`;
        $("#hf-graph .top-fill").attr("d", topFill);
        
        const point = '<circle class="point" cx="LEFT" cy="TOP" r=".4" />';
        $("#hf-graph .point").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperature);
            const y = (g - t) + 10;
            
            $("#hf-graph").html(
                $("#hf-graph").html() +
                point
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
            );
        }
        
        const temp = '<text class="temp" x="LEFT" y="TOP" text-anchor="middle">TEMP</text>';
        $("#hf-graph .temp").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperature);
            const y = (g - t) + 8;
            
            const temperature = tmp => {
                if (weather.scale === "c"){
                    return `${Math.floor(tmp)}&deg; C`
                }
                else if (weather.scale === "f"){
                    return `${Math.floor(tmp)}&deg; F`
                }
            }
            
            $("#hf-graph").html(
                $("#hf-graph").html() +
                temp
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("TEMP")
                .join(temperature(t))
            );
        }
        
        const summary = '<text class="summary" x="LEFT" y="TOP" text-anchor="middle">SUMMARY</text>';
        $("#hf-graph .summary").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const y = h - 5;
            
            $("#hf-graph").html(
                $("#hf-graph").html() +
                summary
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("SUMMARY")
                .join(data[i].summary)
            );
        }
        
        const time = '<text class="time" x="LEFT" y="TOP" text-anchor="middle">TIME</text>';
        $("#hf-graph .time").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const y = h - 1;
            
            const t = ti => {
                return moment(ti*1000).format("LT")
            }
            
            $("#hf-graph").html(
                $("#hf-graph").html() +
                time
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("TIME")
                .join(t(data[i].time))
            );
        }
    },
    loadDailyForecast: (data) => {
        const tempIAS = (minTemp, maxTemp) => {
            ///temperature in accurate scale
            if (weather.scale === "c"){
                const minC = (minTemp - 32) * (5/9);
                const maxC = (maxTemp - 32) * (5/9);
                const avg = (minC + maxC) / 2;
                return avg * 2
            }
            else if (weather.scale === "f"){
                const avg = (minTemp + maxTemp) / 2;
                return avg * 2
            }
        }
        
        const gnl = () => {
            ///gnl means greatest and least degree
            let list = [];
            for (let i = 0; i < data.length; i++){
                list.push(tempIAS(data[i].temperatureMin, data[i].temperatureMax));
            }
            list = list.sort((a,b) => b-a);
            
            return {
                g: list[0],
                l: list[list.length-1]
            }
        };
        const g = gnl().g;
        const l = gnl().l;
        const h = (g-l) + 15;
        
        $("#daily-forecast section").html(
            dfGraph
            .split("VIEWBOX")
            .join(`0 0 80 ${h}`)
        );
        
        const line = '<line class="line" x1="LEFT" y1="TOP" x2="LEFT" y2="BOTTOM" />';
        $("#df-graph .line").remove();
        for (let i = 1; i < data.length; i++){
            const x = (i * 10);
            const t = tempIAS(data[i].temperatureMin, data[i].temperatureMax);
            const y = (g - t) + 5;
            const y2 = h - 7;
            
            $("#df-graph").html(
                $("#df-graph").html() +
                line
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("BOTTOM")
                .join(y2)
            );
        }
        
        let graphLine = "";
        let firstPoint = null;
        for (let i = 0; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperatureMin, data[i].temperatureMax);
            const y = (g - t) + 5;
            if (i === 0){
                firstPoint = `T0,${y}`;
                graphLine += `M0,${y} `;
            }
            else if (i === 1){
                graphLine += `Q5,${y+1} ${x},${y} `
            }
            else if (i > 1 && i !== data.length-1) {
                graphLine += `T${x},${y} `;
            }
            else {
                graphLine += `T${x},${y} T${x+10},${y}`;
            }
        }
        $("#df-graph .graph-line").attr("d", graphLine);
        
        const topFill = `${graphLine} T80,0 T0,0 ${firstPoint}`;
        $("#df-graph .top-fill").attr("d", topFill);
        
        const point = '<circle class="point" cx="LEFT" cy="TOP" r=".27" />';
        $("#df-graph .point").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperatureMin, data[i].temperatureMax);
            const y = (g - t) + 5;
            
            $("#df-graph").html(
                $("#df-graph").html() +
                point
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
            );
        }
        
        const temp = '<text class="temp" x="LEFT" y="TOP" text-anchor="middle">TEMP</text>';
        $("#df-graph .temp").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const t = tempIAS(data[i].temperatureMin, data[i].temperatureMax);
            const y = (g - t) + 3.7;
            
            const temperature = (tempMin, tempMax) => {
                if (weather.scale === "c"){
                    return `${Math.floor((tempMin - 32) * (5/9))} - ${Math.floor((tempMax - 32) * (5/9))}&deg; C`
                }
                else if (weather.scale === "f"){
                    return `${Math.floor(tempMin)} - ${Math.floor(tempMax)}&deg; F`
                }
            }
            
            $("#df-graph").html(
                $("#df-graph").html() +
                temp
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y)
                .split("TEMP")
                .join(temperature(data[i].temperatureMin, data[i].temperatureMax))
            );
        }
        
        const summary = '<text class="summary" x="LEFT" y="TOP" text-anchor="middle">SUMMARY</text>';
        $("#df-graph .summary").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const y1 = h - 5.8;
            const y2 = h - 4.8;
            const summ = data[i].summary;
            let separateAt = 0;
            for (let i = 0; i < summ.length; i++){
                if (summ[i] === " "){
                    separateAt++
                }
            }
            if (separateAt === 3){
                separateAt = 2;
            }
            else {
                separateAt = Math.floor(separateAt/2);
            }
            let summary1 = "";
            let summary2 = "";
            let i2 = 0;
            let spaceCount = 0;
            for (let i = 0; i < summ.length; i++){
                if (summ[i] === " "){
                    spaceCount++
                }
                if (spaceCount >= separateAt){
                    i2 = i+1;
                    break
                }
                else {
                    summary1 += summ[i];
                }
            }
            for (let i = i2; i < summ.length; i++){
                summary2 += summ[i];
            }
            
            $("#df-graph").html(
                $("#df-graph").html() +
                summary
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y1)
                .split("SUMMARY")
                .join(summary1)
            );
            $("#df-graph").html(
                $("#df-graph").html() +
                summary
                .split("LEFT")
                .join(x)
                .split("TOP")
                .join(y2)
                .split("SUMMARY")
                .join(summary2)
            );
        }
        
        const time = '<text class="time" x="LEFT" y="TOP" text-anchor="middle">TIME</text>';
        $("#df-graph .time").remove();
        for (let i = 1; i < data.length; i++){
            const x = i * 10;
            const y = h - 1;
            
            const t = ti => {
                return moment(ti*1000).format("dddd")
            }
            
            if (i === 1){
                $("#df-graph").html(
                    $("#df-graph").html() +
                    time
                    .split("LEFT")
                    .join(x)
                    .split("TOP")
                    .join(y)
                    .split("TIME")
                    .join("Tomorrow")
                );
            }
            else {
                $("#df-graph").html(
                    $("#df-graph").html() +
                    time
                    .split("LEFT")
                    .join(x)
                    .split("TOP")
                    .join(y)
                    .split("TIME")
                    .join(t(data[i].time))
                );
            }
        }
    },
    setTodayIcon: icon => {
        weather.setTodayIconDimentions();
        
        const icns = new Skycons({color: icons[icon].color});
        icns.set("today-icon", icon);
        icns.play();
    },
    setTodayIconDimentions: () => {
        const vw = $(window).innerWidth();
        
        if (vw > 1000){
            $("#today-icon")
            .attr("width", "200")
            .attr("height", "200")
            .css({
                "margin-top" : "-100px"
            });
        }
        else if (vw <= 1000 && vw > 700){
            $("#today-icon")
            .attr("width", "150")
            .attr("height", "150")
            .css({
                "margin-top" : "40px"
            });
        }
        else if (vw <= 700){
            $("#today-icon")
            .attr("width", "120")
            .attr("height", "120")
            .css({
                "margin-top" : "40px"
            });
        }
        else {
            $("#today-icon")
            .attr("width", "100")
            .attr("height", "100")
            .css({
                "margin-top" : "30px"
            });
        }
    }
};

$(window)
.on("load", weather.onload)
.on("resize", weather.setTodayIconDimentions);
















