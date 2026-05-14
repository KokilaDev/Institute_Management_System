let studentModuleLoaded = false;

function loadStudentModule() {

    if (studentModuleLoaded) return;
    studentModuleLoaded = true;

    console.log("Student module loaded");

    loadNextStudentId();
    updateDate();
    getAllStudents();
    updateTotalStudents();

    bindStudentEvents();
    bindStudentTableEvents();
}

function bindStudentEvents() {
    $(document).off("click", "#stu_save_btn").on("click", "#stu_save_btn", function () {
        saveStudent();
    });

    $(document).off("click", "#stu_update_btn").on("click", "#stu_update_btn", function () {
        updateStudent();
    });

    $(document).off("click", "#stu_delete_btn").on("click", "#stu_delete_btn", function () {
        deleteStudent();
    });

    $(document).off("click", "#stu_reset_btn").on("click", "#stu_reset_btn", function () {
        clearFields();
    });
}

function loadNextStudentId() {
    $.ajax({
        url: "http://localhost:8080/api/v1/student/generateId",
        method: "GET",
        success: function (res) {
            $('#studentId').text(res.data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

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

function updateDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    $('#registerDate').text(formattedDate);
}

function validate() {
    if (typeof patterns === "undefined" || typeof validateForm === "undefined") {
        console.error("validation.js NOT loaded");
        return false;
    }

    const rules = [
        { element: $("#name"), regex: patterns.name },
        { element: $("#address"), regex: patterns.address },
        { element: $("#contact"), regex: patterns.contact },
        { element: $("#email"), regex: patterns.email }
    ];

    return validateForm(rules);
}

function getAllStudents() {
    $.ajax({
        url: "http://localhost:8080/api/v1/student/getAll",
        method: "GET",
        success: function (response) {
            console.log("Server Response: ", response);

            const students = response.data;
            let tablebody = $('#student_table_body');
            tablebody.empty();

            students.forEach(student => {
                let row = `<tr>
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${student.address}</td>
                    <td>${student.contact}</td>
                    <td>${student.email}</td>
                    <td>${student.registerDate}</td>
                </tr>`;
                tablebody.append(row);
            });
            bindStudentTableEvents();
        }
    });
}

function bindStudentTableEvents() {
    $("#student_table_body").off("click").on("click", "tr", function () {

        $("#studentId").text($(this).find("td:eq(0)").text());
        $("#name").val($(this).find("td:eq(1)").text());
        $("#address").val($(this).find("td:eq(2)").text());
        $("#contact").val($(this).find("td:eq(3)").text());
        $("#email").val($(this).find("td:eq(4)").text());
        $("#registerDate").text($(this).find("td:eq(5)").text());

        clearValidation();
    });
}

function saveStudent() {
    let stuId = $('#studentId').text();
    let stuName = $('#name').val();
    let stuAddress = $('#address').val();
    let stuContact = $('#contact').val();
    let stuEmail = $('#email').val();
    let date = $('#registerDate').text();

    if (!stuName || !stuAddress || !stuContact || !stuEmail) {
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

    let student = {
        studentId: stuId,
        name: stuName,
        address: stuAddress,
        contact: stuContact,
        email: stuEmail,
        registerDate: date
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/student/save",
        method: "POST",
        data: JSON.stringify(student),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Student saved successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            getAllStudents();
            updateTotalStudents();
            clearFields();
        },
        error: function (error) {
            console.log(error.responseJSON);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to save student!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function updateStudent() {
    let stuId = $('#studentId').text();
    let stuName = $('#name').val();
    let stuAddress = $('#address').val();
    let stuContact = $('#contact').val();
    let stuEmail = $('#email').val();
    let stuDate = $('#registerDate').text();

    if (!stuId) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a student to update!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

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

    let student = {
        studentId: stuId,
        name: stuName,
        address: stuAddress,
        contact: stuContact,
        email: stuEmail,
        registerDate: stuDate
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/student/update",
        method: "PUT",
        data: JSON.stringify(student),
        contentType: "application/json",
        success: function (response) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Student updated successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            getAllStudents();
            updateTotalStudents();
            clearFields();
        },
        error: function (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update student!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function deleteStudent() {
    let stuId = $('#studentId').text();

    if (!stuId) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a student first.',
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
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-primary'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/api/v1/student/delete/" + stuId,
                method: "DELETE",
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Student deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    getAllStudents();
                    updateTotalStudents();
                    clearFields();
                },
                error: function (error) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to delete student!',
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
    loadNextStudentId();
    $('#name').val("");
    $('#address').val("");
    $('#contact').val("");
    $('#email').val("");
    updateDate();
    clearValidation();
}