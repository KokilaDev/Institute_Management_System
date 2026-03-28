let enrollmentId = null;

$(document).ready(function() {
    updateFields();
    getAllEnrollments();
});

function validate() {
    const rules = [
        { element: $('#studentId'), regex: patterns.studentId },
        { element: $('#name'), regex: patterns.name },
        { element: $('#paymentType'), regex: patterns.paymentType }
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

$("#paymentType").change(function() {
    let paymentType = $(this).val();
    if (paymentType === "full-cash") {
        $("#discount").val(10);
    } else if (paymentType === "full-card") {
        $("#discount").val(8);
    } else if (paymentType === "bank") {
        $("#discount").val(5);
    } else if (paymentType === "advance") {
        $("#discount").val(3);
    } else {
        $("#discount").val(0);
    }
    calculateTotal();
});

$('#discount').on('input', function() {
    calculateTotal();
});

function calculateTotal() {
    let fee = parseFloat($('#fee').val()) || 0;
    let discount = parseFloat($('#discount').val()) || 0;

    let discountAmount = (fee * discount) / 100;
    let total = fee - discountAmount;

    $('#total').val(total.toFixed(2));
}

$('#enroll_btn').click(function () {
    enrollCourses();
})

function enrollCourses() {
    if (!validate()) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please check your input fields!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

    let studentId = $('#studentId').val();
    let studentName = $('#name').val();
    let courseName = $('#courseName').val();
    let fee = $('#fee').val();
    let paymentType = $('#paymentType').val();
    let discount = $('#discount').val();
    let total = $('#total').val();
    let date = $('#enrollDate').text();

    let enrollment = {
        studentId: studentId,
        studentName: studentName,
        courseName: courseName,
        fee: fee,
        paymentType: paymentType,
        discount: discount,
        total: total,
        enrollDate: date
    }

    if (!studentId || !paymentType) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please fill all fields!',
            showConfirmButton: false,
            timer: 1500
        });
        return;
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
                    <td>${enrollment.paymentType}</td>
                    <td>${enrollment.discount}</td>
                    <td>${enrollment.total}</td>
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
                let selectedPaymentType = $(this).find('td:eq(5)').text();
                let selectedDiscount = $(this).find('td:eq(6)').text();
                let selectedTotal = $(this).find('td:eq(7)').text();
                let selectedDate = $(this).find('td:eq(8)').text();

                enrollmentId = selectedId;
                $('#studentId').val(selectedStudentId);
                $('#name').val(selectedStudentName);
                $('#courseName').val(selectedCourseName);
                $('#fee').val(selectedFee);
                $('#paymentType').val(selectedPaymentType);
                $('#discount').val(selectedDiscount);
                $('#total').val(selectedTotal);
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
    $('#paymentType').val("");
    $('#discount').val("");
    $('#total').val("");
    clearValidation();
}