$(document).ready(function () {
    loadNextStudentId();
    updateDate();
    // getAllStudents();
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
            // getAllStudents();
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

function clearFields() {
    loadNextStudentId();
    $('#name').val("");
    $('#address').val("");
    $('#contact').val("");
    $('#email').val("");
    updateDate();
    clearValidation();
}