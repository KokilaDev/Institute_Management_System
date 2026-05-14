$(document).ready(function() {
    updateTotalStudents();
    updateTotalLecturers();
    updateTotalCourses();
    updateTotalEnrollments();
});

function updateTotalStudents() {
    $.ajax({
        url: "http://localhost:8080/api/v1/student/getAll",
        method: "GET",
        success: function (response) {
            if (response && response.data) {
                $('#totalStudents .num').text(response.data.length);
            }
        },
        error: function (error) {
            console.error("Failed to get total students:", error);
            $('#totalStudents .num').text("0");
        }
    });
}

function updateTotalLecturers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/getAll",
        method: "GET",
        success: function (response) {
            if (response && response.data) {
                $('#totalLecturers .num').text(response.data.length);
            }
        },
        error: function (error) {
            console.error("Failed to get total lecturers:", error);
            $('#totalLecturers .num').text("0");
        }
    });
}

function updateTotalCourses() {
    $.ajax({
        url: "http://localhost:8080/api/v1/course/getAll",
        method: "GET",
        success: function (response) {
            if (response && response.data) {
                $('#totalCourses .num').text(response.data.length);
            }
        },
        error: function (error) {
            console.error("Failed to get total courses:", error);
            $('#totalCourses .num').text("0");
        }
    });
}

function updateTotalEnrollments() {
    $.ajax({
        url: "http://localhost:8080/api/v1/enrollment/getAll",
        method: "GET",
        success: function (response) {
            if (response && response.data) {
                $('#totalEnrollments .num').text(response.data.length);
            }
        },
        error: function (error) {
            console.error("Failed to get total enrollments:", error);
            $('#totalEnrollments .num').text("0");
        }
    });
}