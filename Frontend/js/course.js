let courseID = null;

$(document).ready(function () {
    loadAllLecturers();
});

function validate() {
    const rules = [
        { element: $('#name'), regex: patterns.name },
        { element: $('#course_fee'), regex: patterns.fee }
    ];
    return validateForm(rules);
}

function loadAllLecturers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/getAll",
        method: "GET",
        success: function (res) {

            $("#lecturer").empty();
            $("#lecturer").append(
                `<option value="" disabled selected hidden>Select Lecturer</option>`
            );
            res.data.forEach(lecturer => {
                $("#lecturer").append(
                    `<option value="${lecturer.name}">
                        ${lecturer.name}
                    </option>`
                );
            });

        },
        error: function (err) {
            console.error("Error loading lecturers", err);
        }
    });
}

$('#cou_save_btn').click(function () {
    saveCourse();
});

function saveCourse() {
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

    let couName = $('#name').val();
    let couDuration = $('#duration').val();
    let couFee = $('#course_fee').val();
    let lecturer = $('#lecturer').val();
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();

    let course = {
        courseName: couName,
        duration: couDuration,
        fee: couFee,
        lecturer: lecturer,
        startDate: startDate,
        endDate: endDate
    };

    if (!couName || !couDuration || !couFee || !lecturer || !startDate || !endDate) {
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
        url: "http://localhost:8080/api/v1/course/save",
        method: "POST",
        data: JSON.stringify(course),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Course saved successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            clearFields();
        },
        error: function (error) {
            console.log(error)
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to save course!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function clearFields() {
    $('#name').val("");
    $('#duration').val("");
    $('#course_fee').val("");
    $('#lecturer').val("");
    $('#start_date').val("");
    $('#end_date').val("");
    courseID = null;
    clearValidation();
}