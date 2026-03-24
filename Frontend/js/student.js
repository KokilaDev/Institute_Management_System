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
