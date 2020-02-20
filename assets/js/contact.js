const inputOnFocus = el => {
    $(el).parent().addClass("active");
}

const inputOnBlur = el => {
    if ($(el).val() <= 0){
        $(el).parent().removeClass("active");
    }
}

$(window).on("load", () => {
    $(".input").val("");
});