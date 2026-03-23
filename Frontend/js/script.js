$(document).ready(function(){

    // ===== State =====
    const State = {
        theme: localStorage.getItem("ngit:theme") || "neutral"
    };

    // ===== Theme & Blur =====
    function setTheme(theme){
        $("body").attr("data-theme", theme);
        localStorage.setItem("ngit:theme", theme);
        State.theme = theme;
    }
    setTheme(State.theme);

    $('input[name="theme"]').change(function(){
        setTheme(this.value);
    });

    $("#blurRange").on("input", function(){
        document.documentElement.style.setProperty("--blur", this.value + "px");
    });

    // ===== Config Panel Toggle =====
    $("#configToggle").click(() => $(".config").toggleClass("open"));

    // Sidebar links click event
    $('.nav a').click(function(e) {
        e.preventDefault(); // default link navigation block කරයි

        var page = $(this).attr('href');

        $('.main-content').load(page);

        $('.nav a').removeClass('active');
        $(this).addClass('active');

    });

    // Default page load: dashboard
    $('.main-content').load('pages/dashboard.html');

    // ===== Hash Routing =====
    $(window).on("hashchange", function(){
        const hash = location.hash.replace("#","") || "dashboard";
        $(`.nav a[data-route="${hash}"]`).click();
    });

    // ===== Initial Load =====
    if(location.hash){
        $(window).trigger("hashchange");
    } else {
        location.hash = "#dashboard";
    }

});