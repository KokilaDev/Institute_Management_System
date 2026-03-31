let enrollmentId = null;

$(document).ready(function() {
    updateFields();
    getAllEnrollments();
});

function validate() {
    const rules = [
        { element: $('#studentId'), regex: patterns.studentId },
        { element: $('#name'), regex: patterns.name }
    ];
    return validateForm(rules);
}

function updateFields() {
    let courseName = sessionStorage.getItem('enrollCourseName');
    let courseFee = sessionStorage.getItem('enrollCourseFee');

    $('#courseName').val(courseName);
    $('#fee').val(courseFee);

    let today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    $('#enrollDate').text(today);
}

$('#studentId').on('input', function() {
    const studentId = $(this).val();
    if(studentId.length === 15) {
        loadStudentName(studentId);
    }
});

function loadStudentName(studentId) {
    if (!studentId) {
        $('#name').val('');
        return;
    }
    $.ajax({
        url: `http://localhost:8080/api/v1/student/${studentId}`,
        method: 'GET',
        success: function(response) {
            if(response && response.code === 200) {
                $('#name').val(response.data.name);
            } else {
                $('#name').val('');
            }
        },
        error: function(err) {
            console.error('Error fetching student:', err);
            $('#name').val('Student Not Found');
        }
    });
}

$('#enroll_btn').click(function () {
    let studentId = $('#studentId').val();
    let studentName = $('#name').val();
    let courseName = $('#courseName').val();
    let fee = $('#fee').val();
    let date = $('#enrollDate').text();

    sessionStorage.setItem("payStudentId", studentId);
    sessionStorage.setItem("payStudentName", studentName);
    sessionStorage.setItem("payCourseName", courseName);
    sessionStorage.setItem("payFee", fee);
    sessionStorage.setItem("payDate", date);

    $('.main-content').load('../payments.html');
})

export function enrollCourses(enrollment) {

    let studentId = $('#studentId').val();
    let studentName = $('#name').val();
    let courseName = $('#courseName').val();
    let fee = $('#fee').val();
    let date = $('#enrollDate').text();

    $.ajax({
        url: "http://localhost:8080/api/v1/enrollment/enroll",
        method: "POST",
        data: JSON.stringify(enrollment),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Enrollment successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });

            getAllEnrollments();
            clearFields();
        },
        error: function (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Enrollment failed!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

$('#cancel_btn').click(function () {
    clearFields();
})

function getAllEnrollments() {
    $.ajax({
        url: "http://localhost:8080/api/v1/enrollment/getAll",
        method: "GET",
        success: function (response) {
            console.log("Fetching all enrollments...");
            console.log("Server Response:", response);

            const enrollments = response.data;
            let tablebody = $('#enrollment_table_body');
            tablebody.empty();

            enrollments.forEach(enrollment => {
                let row = `<tr>
                    <td>${enrollment.enrollmentId}</td>
                    <td>${enrollment.studentId}</td>
                    <td>${enrollment.studentName}</td>
                    <td>${enrollment.courseName}</td>
                    <td>${enrollment.fee}</td>
                    <td>${enrollment.enrollDate}</td>
                </tr>`;
                tablebody.append(row);
            });

            $('#enrollment_table_body tr').click(function () {
                let selectedId = $(this).find('td:eq(0)').text();
                let selectedStudentId = $(this).find('td:eq(1)').text();
                let selectedStudentName = $(this).find('td:eq(2)').text();
                let selectedCourseName = $(this).find('td:eq(3)').text();
                let selectedFee = $(this).find('td:eq(4)').text();
                let selectedDate = $(this).find('td:eq(5)').text();

                enrollmentId = selectedId;
                $('#studentId').val(selectedStudentId);
                $('#name').val(selectedStudentName);
                $('#courseName').val(selectedCourseName);
                $('#fee').val(selectedFee);
                $('#enrollDate').text(selectedDate);

                clearValidation();
            });
        }
    })
}

function clearFields() {
    $('#studentId').val("");
    $('#name').val("");
    $('#courseName').val("");
    $('#fee').val("");
    clearValidation();
}