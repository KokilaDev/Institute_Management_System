let courseID = null;

$(document).ready(function () {
    getAllCourses();
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

function getAllCourses() {
    $.ajax({
        url: "http://localhost:8080/api/v1/course/getAll",
        method: "GET",
        success: function (response) {
            console.log("Server Response:", response);

            const courses = response.data;
            let tableBody = $('#course_table_body');
            tableBody.empty();

            courses.forEach(course => {
                console.log("Course Object:", course);
                let row = `<tr>
                    <td>${course.courseId}</td>
                    <td>${course.courseName}</td>
                    <td>${course.duration}</td>
                    <td>${course.fee}</td>
                    <td>${course.lecturer}</td>
                    <td>${course.startDate}</td>
                    <td>${course.endDate}</td>
                </tr>`;
                tableBody.append(row);
            });

            $('#course_table_body tr').click(function () {
                let selectedCourseId = $(this).find('td:eq(0)').text();
                let selectedName = $(this).find('td:eq(1)').text();
                let selectedDuration = $(this).find('td:eq(2)').text();
                let selectedFee = $(this).find('td:eq(3)').text();
                let selectedLecturer = $(this).find('td:eq(4)').text();
                let selectedStartDate = $(this).find('td:eq(5)').text();
                let selectedEndDate = $(this).find('td:eq(6)').text();

                courseID = selectedCourseId;
                $('#name').val(selectedName);
                $('#duration').val(selectedDuration);
                $('#course_fee').val(selectedFee);
                $('#lecturer').val(selectedLecturer);
                $('#start_date').val(selectedStartDate);
                $('#end_date').val(selectedEndDate);

                clearValidation();
            })
        }
    })
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
            getAllCourses();
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

$('#cou_update_btn').click(function () {
    updateCourse();
});

function updateCourse() {
    let couName = $('#name').val();
    let couDuration = $('#duration').val();
    let couFee = $('#course_fee').val();
    let lecturer = $('#lecturer').val();
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();

    let course = {
        courseId: courseID,
        courseName: couName,
        duration: couDuration,
        fee: couFee,
        lecturer: lecturer,
        startDate: startDate,
        endDate: endDate
    };
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