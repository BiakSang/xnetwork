let index = {
    countryChanged: false,
    category: "topHeadlines",
    country: () => {
        if (Storage !== undefined){
            if (localStorage.getItem("country")){
                return localStorage.getItem("country")
            }
            else {
                localStorage.setItem("country", "in");
                return "in"
            }
        }
        else {
            return "in"
        }
    },
    topHeadlines: null,
    tech: null,
    sports: null,
    space: null,
    politics: null,
    health: null,
    education: null,
    disasters: null,
    science: null,
    agriculture: null,
    entertainment: null,
    jobs: null,
    searchResults: null,
    
    controlCountryList: () => {
        if (index.category === "topHeadlines"){
            const list = $("#country").attr("class");
            if (list.includes("list")){
                $("#country").removeClass("list");
                $(".country-arrow polyline").attr("points", "30,40 50,60 70,40");
            }
            else {
                $("#country").addClass("list");
                $(".country-arrow polyline").attr("points", "30,60 50,40 70,60");
            }
        }
    },
    setCountry: (country) => {
        $("#country").removeClass("list");
        $(".country-arrow polyline").attr("points", "30,40 50,60 70,40");
        
        index.countryChanged = true;
        setTimeout(() => {
            index.countryChanged = false;
        }, 1000);
        
        $(".news").remove();///remove all existing news headers
        
        index.displayLoading();
        index.scrollToPosition();
        $(".search-input").val("");
        
        if (!Storage !== undefined){
            localStorage.setItem("country", country);
        }
        else {
            index.country = () => {
                return country
            };
        }
        
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=8888f596304f4154bff3a7dd9725c3ec`;
        $.get(url, res => {
            index.topHeadlines = res.articles;
            if (index.category === "topHeadlines"){
                index.loadNewsHeaders(index.topHeadlines);
            }
        });
        
        index.setCurrentCountry();
    },
    setCurrentCountry: () => {
        const country = $(".country");
        $(".country").removeClass("active");
        for (let i = 0; i < country.length; i++){
            const dataCountry = $(country[i]).attr("data-country");
            
            if (dataCountry === index.country()){
                $(country[i]).addClass("active");
                $(".current-country").html($(country[i]).html());
                
                break;
            }
        }
    },
    
    scrollTop: 0,
    getNews: (url, category) => {
        $(".search-input").val("");
        if (!index[category]){
            ///if data is not already fetched
            $.get(url, res => {
                index[category] = res.articles;
                if (index.category === category){
                    index.loadNewsHeaders(index[category]);
                }
            });
        }
        else {
            index.loadNewsHeaders(index[category]);
        }
    },
    displayLoading: () => {
        $(".news").remove();
        for (let i = 0; i < 20; i++){
            $("#main").append(loading);
        }
    },
    scrollToPosition: () => {
        setTimeout(() => {
            const firstNewsHeader = document.getElementsByClassName("news")[0];
            const headerHeight = $("header").innerHeight();
            const scrollTop = $(firstNewsHeader).position().top - headerHeight;
            
            $(window).scrollTop(scrollTop);
        }, 100);
    },
    loadNewsHeaders: (data) => {
        $(".news").remove();///remove all existing news headers
        
        const photo = (p) => {
            if (p){
                return p
            }
            else {
                return "logo.jpg"
            }
        };
        
        for (let i = 0; i < data.length; i++){
            $("#main").append(
                headerCode
                .split("PHOTO")
                .join(photo(data[i].urlToImage))
                .split("HEADER")
                .join(data[i].title)
                .split("TIME")
                .join(moment(data[i].publishedAt).startOf("seconds").fromNow())
                .split("URL")
                .join(data[i].url)
            );
        }
    },
    loadNews: (url) => {
        history.pushState(url, null);
        
        index.loadNewsContent(url);
    },
    loadNewsContent: (url) => {
        index.scrollTop = $(window).scrollTop();
        setTimeout(() => {
            const data = index[index.category];
            
            ///load share buttons
            for (let i = 0; i < data.length; i++){
                if (data[i].url === url){
                    $("#share-buttons").html(
                        shareCode
                        .split("URL")
                        .join(url)
                        .split("HEADER")
                        .join(data[i].title)
                    );
                    break;
                }
            }
            
            ///load news content
            const content = (c) => {
                if (c){
                    c += `...<a href="${url}" target="_blank">Read full article</a>`;
                    
                    return c
                }
                else {
                    return `<a href="${url}" target="_blank">Read full article</a>`
                }
            };
            const photo = (p) => {
                if (p){
                    return p
                }
                else {
                    return "logo.jpg"
                }
            };
            for (let i = 0; i < data.length; i++){
                if (data[i].url === url){
                    $("#content").html(
                        contentCode
                        .split("HEADER")
                        .join(data[i].title)
                        .split("TIME")
                        .join(moment(data[i].publishedAt).startOf("seconds").fromNow())
                        .split("PHOTO")
                        .join(photo(data[i].urlToImage))
                        .split("CONTENT")
                        .join(content(data[i].description))
                    );
                    break;
                }
            }
            
            ///load related news
            let relatedNews = data.filter(news => news.url !== url);
            $("#related-news section").html("");
            for (let i = 0; i < 5; i++){
                if (relatedNews[i]){
                    $("#related-news section").append(
                        rnCode
                        .split("PHOTO")
                        .join(photo(relatedNews[i].urlToImage))
                        .split("URL")
                        .join(relatedNews[i].url)
                        .split("HEADER")
                        .join(relatedNews[i].title)
                        .split("TIME")
                        .join(moment(relatedNews[i].publishedAt).startOf("seconds").fromNow())
                    );
                }
            }
            
            $("#news-sub-container").scrollTop(0);
            $("#news").scrollTop(0);
            $("#news").addClass("visible");
            $("main").addClass("inactive");
            $("#intro").addClass("inactive");
        }, 100);
    },
    readMore: (url) => {
        console.log(url);
    },
    onPopState: () => {
        const state = history.state;
        if (state){
            index.loadNewsContent(history.state);
        }
        else {
            $("#news").removeClass("visible");
            $("main").removeClass("inactive");
            $("#intro").removeClass("inactive");
            $(window).scrollTop(index.scrollTop);
        }
    },
    exitNews: () => {
        history.back();
    },
    setCategory: (el, category) => {
        index.category = category;
        $(".category").removeClass("active");
        $(el).addClass("active");
        index.displayLoading();
        
        index.scrollToPosition();
        
        if (category === "topHeadlines"){
            $("#country").removeClass("inactive");
            index.getNews(`https://newsapi.org/v2/top-headlines?country=${index.country()}&apiKey=8888f596304f4154bff3a7dd9725c3ec`, category);
        }
        else {
            $("#country").addClass("inactive");
            index.getNews(`https://newsapi.org/v2/everything?q=${category}&apiKey=8888f596304f4154bff3a7dd9725c3ec`, category);
        }
    },
    search: () => {
        const searchInput = $(".search-input").val();
        
        if (searchInput && searchInput.length > 1){
            index.displayLoading();
            index.scrollToPosition();
            index.category = "searchResults";
            
            $(".category").removeClass("active");
            $("#country").addClass("inactive");
            
            const url = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=8888f596304f4154bff3a7dd9725c3ec`;
            $.get(url, res => {
                index.searchResults = res.articles;
                if (index.category === "searchResults" && index.searchResults.length > 0){
                    index.loadNewsHeaders(index.searchResults);
                }
                else if (index.searchResults.length <= 0){
                    alert("No results found!");
                }
            });
        }
        else {
            null
        }
        
        return false
    },
    
    onLoad: () => {
        $(".date-number").html(date.dateNumber());
        $(".month").html(date.month());
        $(".year").html(date.year());
        
        index.setCurrentCountry();
        
        index.displayLoading();
        index.getNews(`https://newsapi.org/v2/top-headlines?country=${index.country()}&apiKey=8888f596304f4154bff3a7dd9725c3ec`, index.category);
    }
};

$(window)
.on("load", index.onLoad)
.on("popstate", index.onPopState);