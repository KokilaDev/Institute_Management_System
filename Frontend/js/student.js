$(document).ready(function () {
    loadNextStudentId();
    updateDate();
    getAllStudents();
    updateTotalStudents();
});

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
    const rules = [
        { element: $('#name'), regex: patterns.name },
        { element: $('#address'), regex: patterns.address },
        { element: $('#contact'), regex: patterns.contact },
        { element: $('#email'), regex: patterns.email },
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

            $('#student_table_body tr').click(function () {
                let selectedId = $(this).find('td:eq(0)').text();
                let selectedName = $(this).find('td:eq(1)').text();
                let selectedAddress = $(this).find('td:eq(2)').text();
                let selectedContact = $(this).find('td:eq(3)').text();
                let selectedEmail = $(this).find('td:eq(4)').text();
                let selectedDate = $(this).find('td:eq(5)').text();

                $('#studentId').text(selectedId);
                $('#name').val(selectedName);
                $('#address').val(selectedAddress);
                $('#contact').val(selectedContact);
                $('#email').val(selectedEmail);
                $('#registerDate').text(selectedDate);

                clearValidation();
            })
        }
    })
}

$('#stu_save_btn').click(function () {
    saveStudent();
});

function saveStudent() {
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

    let stuId = $('#studentId').text();
    let stuName = $('#name').val();
    let stuAddress = $('#address').val();
    let stuContact = $('#contact').val();
    let stuEmail = $('#email').val();
    let date = $('#registerDate').val();

    let student = {
        studentId: stuId,
        name: stuName,
        address: stuAddress,
        contact: stuContact,
        email: stuEmail,
        registerDate: date
    }

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

$('#stu_update_btn').click(function () {
    updateStudent();
})

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

$('#stu_delete_btn').click(function () {
    deleteStudent();
})

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

$('#stu_reset_btn').click(function () {
    clearFields();
})

function clearFields() {
    loadNextStudentId();
    $('#name').val("");
    $('#address').val("");
    $('#contact').val("");
    $('#email').val("");
    updateDate();
    clearValidation();
}