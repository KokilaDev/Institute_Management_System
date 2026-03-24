$(document).ready(function () {
    loadNextLecturerId();
    updateDate();
    getAllLecturers();
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

function getAllLecturers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/getAll",
        method: "GET",
        success: function(response) {
            console.log("Server Response: ", response);

            const lecturers = response.data;
            let tablebody = $('#lecturer_table_body');
            tablebody.empty();

            lecturers.forEach(lecturer => {
                let row = `<tr>
                    <td>${lecturer.lecturerId}</td>
                    <td>${lecturer.name}</td>
                    <td>${lecturer.specialization}</td>
                    <td>${lecturer.contact}</td>
                    <td>${lecturer.email}</td>
                    <td>${lecturer.registerDate}</td>
                </tr>`;
                tablebody.append(row);
            });

            $('#lecturer_table_body tr').click(function () {
                let selectedId = $(this).find('td:eq(0)').text();
                let selectedName = $(this).find('td:eq(1)').text();
                let selectedSpecialization = $(this).find('td:eq(2)').text();
                let selectedContact = $(this).find('td:eq(3)').text();
                let selectedEmail = $(this).find('td:eq(4)').text();
                let selectedDate = $(this).find('td:eq(5)').text();

                $('#lecturerId').text(selectedId);
                $('#name').val(selectedName);
                $('#specialization').val(selectedSpecialization);
                $('#contact').val(selectedContact);
                $('#email').val(selectedEmail);
                $('#registerDate').text(selectedDate);

                clearValidation();
            })
        }
    })
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
            getAllLecturers();
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