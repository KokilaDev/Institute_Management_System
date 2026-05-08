$(document).ready(function () {

    // Active nav
    $('.nav_content a').click(function () {
        $('.nav_content a').removeClass('active');
        $(this).addClass('active');
    });

    loadSliderCourses();

    // Dropdown
    $(".dropdown").click(function () {
        let $aside = $(this).children("aside");

        if ($aside.is(":hidden")) {
            $aside.slideDown("fast");
            $(this).children("a").css("color", "var(--white)");
        } else {
            $aside.slideUp("fast");
            $(this).children("a").css("color", "var(--lite)");
        }
    });

    // Slick sliders (safe init)
    let slidestoshow = window.matchMedia("(max-width: 920px)").matches ? 1 : 4;
    let arrowmark = !window.matchMedia("(max-width: 920px)").matches;

    $('.blog-slider').slick({
        slidesToShow: slidestoshow,
        slidesToScroll: 1,
        dots: false,
        arrows: arrowmark,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true
    });

    $('.event-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true
    });

});


// ================= MENU CONTROLS =================

function openMenu() {
    $(".side_menu").css("right", "0px");
    $(".overlay").css({ opacity: 1, "z-index": 99 });
}

function closeMenu() {
    let contactTop = parseFloat($(".contact").css("top"));

    if (contactTop >= 10) {
        $(".contact").hide().css("top", "-100%").fadeOut(100);
    } else {
        $(".side_menu").css("right", window.matchMedia("(max-width: 920px)").matches ? "-120%" : "-500px");
    }

    $(".overlay").css({ opacity: 0, "z-index": -1 });
}


// Events (NO duplication)
$(".ham").on("click", openMenu);
$(".close, .overlay").on("click", closeMenu);


// ESC key close
$(document).on("keydown", function (evt) {
    if (evt.key === "Escape" || evt.keyCode === 27) {
        if ($(".overlay").css("opacity") == "1") {
            closeMenu();
        }
    }
});


// Scroll nav
$(window).on("scroll", function () {
    if ($(window).scrollTop() > 80) {
        $("nav").addClass("fixed_nav");
    } else {
        $("nav").removeClass("fixed_nav");
    }
});


// ================= LOAD COURSES =================

function loadSliderCourses() {
    $.ajax({
        url: "http://localhost:8080/api/v1/course/getAll",
        method: "GET",
        success: function (response) {
            console.log(response);
            let courses = response.data;
            let html = "";

            courses.forEach(course => {
                let shortName = course.courseName.length > 20
                    ? course.courseName.substring(0, 20) + "..."
                    : course.courseName;
                html += `
                    <li>
                        <figure>
                            <img src="assets/web.jpg" alt="${course.courseName}" loading="lazy" />
                        </figure>
                        <article class="padding_1x">
                            <strong class="tag">${shortName}</strong>
                            <a href="#" class="title small">${course.courseName}</a>
                            <p>${course.courseDescription}</p>
                            <aside class="fixed_flex">
                                <span class="flex-content">
                                    <a href="#"><i class="fa fa-clock-o"></i> ${course.duration}</a>
                                    <a href="#"><i class="fa fa-calendar"></i> ${course.startDate}</a>
                                </span>
                            </aside>
                        </article>
                    </li>
                `;
            });

            let $slider = $('#courseSlider');

            // destroy slick if already exists
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('destroy');
            }

            $slider.html(html);

            let slidesToShow = window.matchMedia("(max-width: 920px)").matches ? 1 : 4;
            let arrows = !window.matchMedia("(max-width: 920px)").matches;

            $slider.slick({
                slidesToShow: slidesToShow,
                slidesToScroll: 1,
                dots: false,
                arrows: arrows,
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true
            });
        },

        error: function (error) {
            console.log("API Error:", error.responseText);
        }
    });
}