$(document).ready(function () {
    loadNextLecturerId();
    updateDate();
    // getAllLecturers();
});

function loadNextLecturerId() {
    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/generateId",
        method: "GET",
        success: function (res) {
            $('#lecturerId').text(res.data);
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
        { element: $('#contact'), regex: patterns.contact },
        { element: $('#email'), regex: patterns.email },
    ];
    return validateForm(rules);
}

$('#lec_save_btn').click(function () {
    saveLecturer();
});

function saveLecturer() {
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

    let lecId = $('#lecturerId').text();
    let lecName = $('#name').val();
    let lecSpecialization = $('#specialization').val();
    let lecContact = $('#contact').val();
    let lecEmail = $('#email').val();
    let date = $('#registerDate').val();

    let lecturer = {
        lecturerId: lecId,
        name: lecName,
        specialization: lecSpecialization,
        contact: lecContact,
        email: lecEmail,
        registerDate: date
    }

    if (!lecName || !lecSpecialization || !lecContact || !lecEmail) {
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
        url: "http://localhost:8080/api/v1/lecturer/save",
        method: "POST",
        data: JSON.stringify(lecturer),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Lecturer saved successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            // getAllLecturers();
            clearFields();
        },
        error: function (error) {
            console.log(error.responseJSON);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to save lecturer!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function clearFields() {
    loadNextLecturerId()
    $('#name').val("");
    $('#specialization').val("");
    $('#contact').val("");
    $('#email').val("");
    updateDate();
    clearValidation();
}