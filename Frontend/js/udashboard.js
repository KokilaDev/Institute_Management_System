$(document).ready(function() {
    updateTotalEnrollments();

    // === Payment Trends - Line Chart ===
    var paymentCtx = $("#paymentTrends")[0].getContext("2d");
    var paymentChart = new Chart(paymentCtx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
                label: 'Payments (₹)',
                data: [5000, 7000, 6000, 8000, 7500, 9000, 9500],
                backgroundColor: 'rgba(51, 153, 255, 0.2)',
                borderColor: 'rgba(51, 153, 255, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // === Attendance Stats - Pie Chart ===
    var attendanceCtx = $("#attendanceStats")[0].getContext("2d");
    var attendanceChart = new Chart(attendanceCtx, {
        type: 'pie',
        data: {
            labels: ["Present", "Absent"],
            datasets: [{
                label: 'Attendance',
                data: [75, 25],
                backgroundColor: [
                    'rgba(51, 153, 255, 0.7)',
                    'rgba(200, 200, 200, 0.7)'
                ],
                borderColor: [
                    'rgba(51, 153, 255, 1)',
                    'rgba(150, 150, 150, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

});

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