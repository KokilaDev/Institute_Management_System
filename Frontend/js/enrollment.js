window.enrollmentId = window.enrollmentId || null;

window.enrollmentModuleLoaded = false;

function loadEnrollmentModule() {
    if (window.enrollmentModuleLoaded) return;
    window.enrollmentModuleLoaded = true;

    console.log("Enrollment module loaded");

    updateFields();
    getAllEnrollments();
    updateTotalEnrollments();

    bindEnrollmentEvents();
}

function bindEnrollmentEvents() {
    let typingTimer;

    $(document).off('input', '#studentId').on('input', '#studentId', function () {
        console.log("typing...");
        console.log("value:", $(this).val());

        clearTimeout(typingTimer);

        const studentId = $(this).val().trim();

        if (!studentId) return;

        typingTimer = setTimeout(() => {
            console.log("calling API...");
            loadStudentName(studentId);
        }, 300);
    });

    $(document).on('focus', '#studentId', function () {
        console.log("input active");
    });

    $(document).off('click', '#enroll_btn').on('click', '#enroll_btn', function () {
        handleEnrollmentFlow();
    });

    $(document).off('click', '#cancel_btn').on('click', '#cancel_btn', function () {
        clearEnrollmentFields();
    });
}

// function validate() {
//     const rules = [
//         { element: $('#studentId'), regex: patterns.studentId },
//         { element: $('#name'), regex: patterns.name }
//     ];
//     return validateForm(rules);
// }

function updateFields() {
    let courseName = sessionStorage.getItem('enrollCourseName');
    let courseFee = sessionStorage.getItem('enrollCourseFee');

    console.log("course data received");

    $('#courseName').val(courseName);
    $('#fee').val(courseFee);

    let today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    $('#enrollDate').text(today);
}

window.loadStudentName = function(studentId) {
    if (!studentId) {
        $('#studentName').val('');
        return;
    }
    console.log("Calling API for:", studentId);

    $.ajax({
        url: `http://localhost:8080/api/v1/student/${studentId}`,
        method: 'GET',
        success: function(response) {
            const data = response?.data;
            const name = data?.studentName || data?.name || '';

            console.log("SETTING NAME:", name);

            $('.main-content').find('#studentName').val(name);
        },
        error: function(err) {
            console.log("ERROR:", err);
            $('#studentName').val('Student Not Found');
        }
    });
}

function handleEnrollmentFlow() {
    let studentId = $('#studentId').val();
    let studentName = $('#studentName').val();
    let courseName = $('#courseName').val();
    let fee = $('#fee').val();
    let date = $('#enrollDate').text();

    console.log("enrollment data passed");

    sessionStorage.setItem("payStudentId", studentId);
    sessionStorage.setItem("payStudentName", studentName);
    sessionStorage.setItem("payCourseName", courseName);
    sessionStorage.setItem("payFee", fee);
    sessionStorage.setItem("payDate", date);

    $('.main-content').load('../payments.html', function () {
        loadPaymentModule();
    });
}

window.enrollCourses = function() {
    let enrollment = {
        studentId: $('#studentId').val(),
        studentName: $('#studentName').val(),
        courseName: $('#courseName').val(),
        fee: $('#fee').val(),
        date: $('#enrollDate').text()
    }

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
            updateTotalEnrollments();
            clearEnrollmentFields();
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
            bindTableClick();
        }
    })
}

function bindTableClick() {
    $(document).off('click', '#enrollment_table_body tr')
        .on('click', '#enrollment_table_body tr', function () {
            enrollmentId = $(this).find('td:eq(0)').text();

            $('#studentId').val($(this).find('td:eq(1)').text());
            $('#studentName').val($(this).find('td:eq(2)').text());
            $('#courseName').val($(this).find('td:eq(3)').text());
            $('#fee').val($(this).find('td:eq(4)').text());
            $('#enrollDate').text($(this).find('td:eq(5)').text());

        clearValidation();
    });
}

function clearEnrollmentFields() {
    $('#studentId').val("");
    $('#studentName').val("");
    $('#courseName').val("");
    $('#fee').val("");
    clearValidation();
}