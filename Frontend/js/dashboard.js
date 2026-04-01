$(document).ready(function() {
    updateTotalStudents();
    updateTotalLecturers();
    updateTotalCourses();
    updateTotalEnrollments();

    // STUDENT ENROLLMENT - Bar Chart
    const ctxStudents = document.getElementById('chartStudents').getContext('2d');
    const studentChart = new Chart(ctxStudents, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Enrollments',
                data: [50, 75, 60, 80, 90, 100],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

// MONTHLY REVENUE - Pie Chart
    const ctxRevenue = document.getElementById('monthlyRevenue').getContext('2d');
    const revenueChart = new Chart(ctxRevenue, {
        type: 'pie',
        data: {
            labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
            datasets: [{
                label: 'Revenue',
                data: [3000, 1500, 2000, 1000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});

function updateTotalStudents() {
    $.ajax({
        url: "http://localhost:8080/api/v1/student/getAll",
        method: "GET",
        success: function (response) {
            const total = response.data.length;
            $('#totalStudents .num').text(total);
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
            const total = response.data.length;
            $('#totalLecturers .num').text(total);
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
            const total = response.data.length;
            $('#totalCourses .num').text(total);
        },
        error: function (error) {
            console.log("Failed to get total courses:", error);
            $('#totalCourses .num').text("0");
        }
    })
}


function updateTotalEnrollments() {
    $.ajax({
        url: "http://localhost:8080/api/v1/enrollment/getAll",
        method: "GET",
        success: function (response) {
            const total = response.data.length;
            $('#totalEnrollments .num').text(total);
        },
        error: function (error) {
            console.log("Failed to get total enrollments:", error);
            $('#totalEnrollments .num').text("0");
        }
    })
}