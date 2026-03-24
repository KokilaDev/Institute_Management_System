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