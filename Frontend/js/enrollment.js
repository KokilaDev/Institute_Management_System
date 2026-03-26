$(document).ready(function() {
    // Auto-fill Course Name & Fee
    let courseName = sessionStorage.getItem('enrollCourseName');
    let courseFee = sessionStorage.getItem('enrollCourseFee');

    $('#courseName').val(courseName);
    $('#fee').val(courseFee);

    // Auto-fill Enrollment Date
    let today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    $('#enrollDate').text(today);
});