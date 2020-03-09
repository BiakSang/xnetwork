let header = {
    setReadingModeOnPageLoad: () => {
        if (!location.href.includes("/weather")){
            let mode = "night";
            if (Storage !== undefined){
                if (localStorage.getItem("reading-mode")){
                    mode = localStorage.getItem("reading-mode");
                }
                else {
                    localStorage.setItem("reading-mode", mode);
                }
            }
            
            $("body").attr("class", mode);
            $("#reading-modes").attr("data-mode", mode);
        }
        else {
            const hour = new Date().getHours();
            if (hour < 17 && hour > 4){
                $("body").attr("class", "day");
            }
            else {
                $("body").attr("class", "night");
            }
        }
    },
    setTempScaleOnPageLoad: () => {
        let scale = "c";
        if (Storage !== undefined){
            if (localStorage.getItem("temp-scale")){
                scale = localStorage.getItem("temp-scale");
            }
            else {
                localStorage.setItem("temp-scale", scale);
            }
        }
        
        if (location.href.includes("/weather")){
            weather.scale = scale;
            $("#temp-scales").attr("data-scale", scale);
        }
    },
    onload: () => {
        header.setReadingModeOnPageLoad();
        if (location.href.includes("/weather")){
            header.setTempScaleOnPageLoad();
        }
        
        setTimeout(() => {
            $("#splashscreen").fadeOut(200);
        }, 1000);
    },
    changeReadingMode: (el) => {
        const mode = $(el).attr("data-mode");
        if (mode === "day"){
            $(el).attr("data-mode", "night");
            $("body").attr("class", "night");
            localStorage.setItem("reading-mode", "night");
        }
        else if (mode === "night"){
            $(el).attr("data-mode", "day");
            $("body").attr("class", "day");
            localStorage.setItem("reading-mode", "day");
        }
    },
    changeTempScale: (el) => {
        const scale = $(el).attr("data-scale");
        if (scale === "c"){
            if (location.href.includes("/weather")){
                $(el).attr("data-scale", "f");
                weather.scale = "f";
                localStorage.setItem("temp-scale", "f");
            }
        }
        else if (scale === "f") {
            if (location.href.includes("/weather")){
                $(el).attr("data-scale", "c");
                weather.scale = "c";
                localStorage.setItem("temp-scale", "c");
            }
        }
        
        if (location.href.includes("/weather")){
            weather.loadTodaysData(weather.data);
            weather.loadHourlyForecast(weather.data.hourly.data);
            weather.loadDailyForecast(weather.data.daily.data);
        }
    },
    menuOnClick: () => {
        const visible = $("header").attr("class");
        if (visible === "menu-visible"){
            $("header").attr("class", "");
        }
        else {
            $("header").attr("class", "menu-visible");
        }
    }
}

$(window).on("load", header.onload);