$(document).ready(function () {
    // Set custom heights using CSS or HTML attribute
    $('#examScores').css('height', '1000px'); // custom height
    $('#attendanceTrends').css('height', '1000px');

    // Course Progress Chart
    const ctxProgress = document.getElementById('examScores').getContext('2d');
    const progressChart = new Chart(ctxProgress, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                label: 'Progress',
                data: [50, 50],
                backgroundColor: ['#3399ff', '#e0e0e0'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Attendance Chart
    const ctxAttendance = document.getElementById('attendanceTrends').getContext('2d');
    const attendanceChart = new Chart(ctxAttendance, {
        type: 'bar',
        data: {
            labels: ['OOP', 'Web Dev', 'DB Systems', 'Software', 'Network', 'Data Science'],
            datasets: [{
                label: 'Attendance %',
                data: [80, 100, 75, 90, 60, 85],
                backgroundColor: '#002347'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
});