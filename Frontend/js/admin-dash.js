var element;

$(document).ready(function () {

    function loadPage(page) {
        $('.main-content').load(page, function () {

            // dashboard load
            if (page.includes("admin-dashboard.html")) {

                updateTotalStudents();
                updateTotalLecturers();
                updateTotalCourses();
                updateTotalEnrollments();

                setTimeout(() => {
                    initDashboardCharts();
                }, 0);
            }

            // students
            if (page.includes("students.html")) {
                loadStudentModule();
            }

            // lecturers
            if (page.includes("lecturers.html")) {
                loadLecturerModule();
            }

            // courses
            if (page.includes("courses.html")) {
                getAllCourses();
                updateTotalCourses();
            }

            // enrollments
            if (page.includes("enrollments-list.html")) {
                getAllEnrollments();
                updateTotalEnrollments();
            }
        });
    }

    // NAV CLICK
    $('.nav_content a, .side_menu a').click(function (e) {
        e.preventDefault();

        const page = $(this).attr('href');
        loadPage(page);

        $('.nav_content a, .side_menu a').removeClass('active');
        $(this).addClass('active');
    });

    // DEFAULT LOAD
    loadPage('../dashboards/admin-dashboard.html');
});

if (window.matchMedia("(max-width: 920px)").matches === false) {
    $(".ham").on("click", function(){
        $(".side_menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","99");
    });

    $(".close, .overlay").on("click", function(){
        $(".side_menu").css("right", "-500px");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });

} else {

    $(".ham").on("click", function(){
        $(".side_menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","9");
    });

    $(".close, .overlay").on("click", function(){
        $(".side_menu").css("right", "-120%");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });

}

window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("nav").addClass("fixed_nav");
    } else {
        $("nav").removeClass("fixed_nav");
    }
};

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        if ($(".overlay").css("opacity") == "1"){
            $(".side_menu").css("right", "-120%");
            $(".overlay").css("opacity","0");
            $(".overlay").css("z-index","-1");
        }
    }
};

$(".dropdown").click(function(){
    if ($(this).children("aside").is(":hidden")){
        $(this).children("aside").show("slow");
        $(this).children("a").css("color","var(--white)");
    } else {
        $(this).children("aside").hide("slow");
        $(this).children("a").css("color","var(--lite)");
    }
});

var slidestoshow, arrowmark;

if (window.matchMedia("(max-width: 920px)").matches === false) {
    slidestoshow = 4;
    arrowmark = true;
} else {
    slidestoshow = 1;
    arrowmark = false;
}

const State = {
    theme: localStorage.getItem("ngit:theme") || "light"
};

function setTheme(theme){
    $("body").attr("data-theme", theme);
    localStorage.setItem("ngit:theme", theme);
    State.theme = theme;
    if(theme === "dark") {
        $("#themeToggle").html('<i class="bi bi-sun"></i>');
    } else {
        $("#themeToggle").html('<i class="bi bi-moon"></i>');
    }
}
setTheme(State.theme);

$("#themeToggle").click(function(){
    let newTheme = State.theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
});

$(window).on("hashchange", function(){
    const hash = location.hash.replace("#","") || "dashboard";
    $('.nav_content a, .side_menu a').each(function(){
        if($(this).attr("href").includes(hash)){
            $(this).click();
        }
    });
});

if(location.hash){
    $(window).trigger("hashchange");
} else {
    location.hash = "#dashboard";
}

function initDashboardCharts() {

    const studentCanvas = document.getElementById("chartStudents");
    const revenueCanvas = document.getElementById("monthlyRevenue");

    if (!studentCanvas || !revenueCanvas) {
        console.log("Canvas not found");
        return;
    }

    // destroy old charts
    if (window.studentChart) window.studentChart.destroy();
    if (window.revenueChart) window.revenueChart.destroy();

    window.studentChart = new Chart(studentCanvas, {
        type: "bar",
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun"],
            datasets: [{
                label: "Enrollments",
                data: [50,75,60,80,90,100]
            }]
        }
    });

    window.revenueChart = new Chart(revenueCanvas, {
        type: "pie",
        data: {
            labels: ["W1","W2","W3","W4"],
            datasets: [{
                data: [3000,1500,2000,1000]
            }]
        }
    });
}