function loadLecturerModule() {
    if (window.lecturerModuleLoaded) return;
    window.lecturerModuleLoaded = true;

    console.log("Lecturer module loaded");

    loadNextLecturerId();
    updateDate();
    getAllLecturers();
    updateTotalLecturers();

    bindLecturerEvents();
    bindLecturerTableEvents();
}

function bindLecturerEvents() {
    $(document).off("click", "#lec_save_btn").on("click", "#lec_save_btn", function () {
        saveLecturer();
    });

    $(document).off("click", "#lec_update_btn").on("click", "#lec_update_btn", function () {
        updateLecturer();
    });

    $(document).off("click", "#lec_delete_btn").on("click", "#lec_delete_btn", function () {
        deleteLecturer();
    });

    $(document).off("click", "#lec_reset_btn").on("click", "#lec_reset_btn", function () {
        clearFields();
    });
}

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

function updateTotalLecturers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/getAll",
        method: "GET",
        success: function (response) {
            const total = response.data.length;
            $('#totalLecturers .num').text(total);
        },
        error: function (error) {
            console.error("Failed to get total lecturers:", error);
            $('#totalLecturers .num').text("0");
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
            bindLecturerTableEvents();
        }
    })
}

function bindLecturerTableEvents() {
    $(document)
        .off("click", "#lecturer_table_body tr")
        .on("click", "#lecturer_table_body tr", function () {

            $('#lecturerId').text($(this).children("td").eq(0).text());
            $('#name').val($(this).children("td").eq(1).text());
            $('#specialization').val($(this).children("td").eq(2).text());
            $('#contact').val($(this).children("td").eq(3).text());
            $('#email').val($(this).children("td").eq(4).text());
            $('#registerDate').text($(this).children("td").eq(5).text());

            clearValidation();
        });
}

function saveLecturer() {
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

    let lecId = $('#lecturerId').text();
    let lecName = $('#name').val();
    let lecSpecialization = $('#specialization').val();
    let lecContact = $('#contact').val();
    let lecEmail = $('#email').val();
    let date = $('#registerDate').text();

    console.log(lecName, lecSpecialization, lecContact, lecEmail);

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
            resetLecturerForm();
            getAllLecturers();
            updateTotalLecturers();
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

function updateLecturer() {
    let lecId = $('#lecturerId').text();
    let lecName = $('#name').val();
    let lecSpecialization = $('#specialization').val();
    let lecContact = $('#contact').val();
    let lecEmail = $('#email').val();
    let lecDate = $('#registerDate').text();

    if (!lecId) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a lecturer to update!',
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

    let lecturer = {
        lecturerId: lecId,
        name: lecName,
        specialization: lecSpecialization,
        contact: lecContact,
        email: lecEmail,
        registerDate: lecDate
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/lecturer/update",
        method: "PUT",
        data: JSON.stringify(lecturer),
        contentType: "application/json",
        success: function (response) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Lecturer updated successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            resetLecturerForm();
            getAllLecturers();
        },
        error: function (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update lecturer!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function deleteLecturer() {
    let lecId = $('#lecturerId').text();

    if (!lecId) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please select a lecturer first.',
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
                url: "http://localhost:8080/api/v1/lecturer/delete/" + lecId,
                method: "DELETE",
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Lecturer deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    resetLecturerForm();
                    getAllLecturers();
                },
                error: function (error) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to delete lecturer!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            })
        }
    });
}

function resetLecturerForm() {
    clearFields();
    loadNextLecturerId();
    updateDate();
}

function clearFields() {
    console.log("clearFields called");

    $('#name').val("");
    $('#specialization').val("");
    $('#contact').val("");
    $('#email').val("");

    $('#lecturerId').text("");
    $('#registerDate').text("");

    // if (typeof clearValidation === "function") {
    //     clearValidation();
    // }
}