window.courseID = window.courseID || null;

function loadCourseModule() {
    if (window.courseModuleLoaded) return;
    window.courseModuleLoaded = true;

    console.log("Course module loaded");

    getAllCourses();
    loadAllLecturers();
    updateTotalCourses();
    loadCourseCards();

    bindCourseEvents();
    bindCourseTableEvents();
}

function bindCourseEvents() {
    $(document).off('click', '#cou_save_btn').on('click', '#cou_save_btn', function () {
        saveCourse();
    });

    $(document).off('click', '#cou_update_btn').on('click', '#cou_update_btn', function () {
        updateCourse();
    });

    $(document).off('click', '#cou_delete_btn').on('click', '#cou_delete_btn', function () {
        deleteCourse(courseID);
    });

    $(document).off('click', '#cou_reset_btn').on('click', '#cou_reset_btn', function () {
        clearFields();
    });

    $(document).on('click', '.enroll-btn', function() {
        let courseId = $(this).data('id');
        let courseName = $(this).data('name');
        let courseFee = $(this).data('fee');

        console.log("course data passed");

        sessionStorage.setItem('enrollCourseId', courseId);
        sessionStorage.setItem('enrollCourseName', courseName);
        sessionStorage.setItem('enrollCourseFee', courseFee);

        $('.main-content').load('../enrollment.html', function() {
            $('#courseName').val(sessionStorage.getItem('enrollCourseName'));
            $('#fee').val(sessionStorage.getItem('enrollCourseFee'));
            $('#enrollDate').text(sessionStorage.getItem('enrollDate'));
        });
    });
}

function validate() {
    const rules = [
        { element: $('#name'), regex: patterns.name },
        { element: $('#course_fee'), regex: patterns.fee }
    ];
    return validateForm(rules);
}

function loadCourseCards() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/course/getAll',
        method: 'GET',
        success: function(response) {
            console.log("Server Response:", response);

            let courses = response.data;
            $('#courseContainer').empty();

            courses.forEach(function(course) {
                let card = `
                    <div class="card_container glass-card">
                        <div class="card__header">
                            <h1>${course.courseName}</h1>
                            <h2>Lecturer: Prof.<span>${course.lecturer}</span></h2>
                        </div>
                        <div class="card__details">
                            <div class="card__byline">${course.courseDescription}</div>
                            <div class="card__byline">Duration: ${course.duration}</div>
                            <div class="card__byline">Fee: Rs.${course.fee}</div>
                            <div class="card__byline">Start Date: ${course.startDate}</div>
                            <button class="card__like enroll-btn"
                                data-id="${course.courseId}"
                                data-name="${course.courseName}"
                                data-fee="${course.fee}"
                            >
                            Enroll Now
                            </button>
                        </div>
                    </div>
                `;
                $('#courseContainer').append(card);
            });
        },
        error: function(err) {
            console.error('Error fetching courses:', err);
        }
    });
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
                    <td>${course.courseDescription}</td>
                    <td>${course.duration}</td>
                    <td>${course.fee}</td>
                    <td>${course.lecturer}</td>
                    <td>${course.startDate}</td>
                    <td>${course.endDate}</td>
                </tr>`;
                tableBody.append(row);
            });
            bindCourseTableEvents();
        }
    })
}

function bindCourseTableEvents() {
    $("#course_table_body")
        .off("click")
        .on("click", "tr", function () {

            courseID = $(this).find("td:eq(0)").text();

            $("#name").val($(this).find("td:eq(1)").text());
            $("#description").val($(this).find("td:eq(2)").text());
            $("#duration").val($(this).find("td:eq(3)").text());
            $("#course_fee").val($(this).find("td:eq(4)").text());
            $("#lecturer").val($(this).find("td:eq(5)").text());
            $("#start_date").val($(this).find("td:eq(6)").text());
            $("#end_date").val($(this).find("td:eq(7)").text());

            clearValidation();
        });
}

function saveCourse() {
    // if (!validate()) {
    //     Swal.fire({
    //         toast: true,
    //         position: 'top-end',
    //         icon: 'warning',
    //         title: 'Please check your input fields!',
    //         showConfirmButton: false,
    //         timer: 2000,
    //         timerProgressBar: true
    //     });
    //     return;
    // }

    let couName = $('#name').val();
    let coudescription = $('#description').val();
    let couDuration = $('#duration').val();
    let couFee = $('#course_fee').val();
    let lecturer = $('#lecturer').val();
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();

    let course = {
        courseName: couName,
        courseDescription: coudescription,
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
            updateTotalCourses();
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

function updateCourse() {
    if (!courseID) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a course to update!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

    let couName = $('#name').val();
    let coudescription = $('#description').val();
    let couDuration = $('#duration').val();
    let couFee = $('#course_fee').val();
    let lecturer = $('#lecturer').val();
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();

    let course = {
        courseId: courseID,
        courseName: couName,
        courseDescription: coudescription,
        duration: couDuration,
        fee: couFee,
        lecturer: lecturer,
        startDate: startDate,
        endDate: endDate
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/course/update",
        method: "PUT",
        data: JSON.stringify(course),
        contentType: "application/json",
        success: function (response) {
            console.log(response.data);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Course updated successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            getAllCourses();
            updateTotalCourses();
            clearFields();
        },
        error: function (error) {
            console.log(error.responseText);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update course!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function deleteCourse(courseId) {
    if (!courseID) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a course first.',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        focusCancel: true,
        buttonsStyling: true,
        customClass: {
            confirmButton: 'btn btn-danger custom-width',
            cancelButton: 'btn btn-secondary'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/api/v1/course/delete/" + courseId,
                method: "DELETE",
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Course deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    getAllCourses();
                    updateTotalCourses();
                    clearFields();
                },
                error: function (error) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to delete course!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            })
        }
    });
}

function clearFields() {
    $('#name').val("");
    $('#description').val("");
    $('#duration').val("");
    $('#course_fee').val("");
    $('#lecturer').val("");
    $('#start_date').val("");
    $('#end_date').val("");
    courseID = null;
    clearValidation();
}