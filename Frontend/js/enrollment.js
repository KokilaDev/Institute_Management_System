$(document).ready(function() {
    updateFields();
});

function updateFields() {
    let courseName = sessionStorage.getItem('enrollCourseName');
    let courseFee = sessionStorage.getItem('enrollCourseFee');

    $('#courseName').val(courseName);
    $('#fee').val(courseFee);

    let today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    $('#enrollDate').text(today);
}

$('#studentId').on('input', function() {
    const studentId = $(this).val();
    if(studentId.length === 15) {
        loadStudentName(studentId);
    }
});

function loadStudentName(studentId) {
    if (!studentId) {
        $('#name').val('');
        return;
    }
    $.ajax({
        url: `http://localhost:8080/api/v1/student/${studentId}`,
        method: 'GET',
        success: function(response) {
            if(response && response.code === 200) {
                $('#name').val(response.data.name);
            } else {
                $('#name').val('');
            }
        },
        error: function(err) {
            console.error('Error fetching student:', err);
            $('#name').val('Student Not Found');
        }
    });
}

function clearFields() {
    $('#studentId').val("");
    $('#name').val("");
    $('#courseName').val("");
    $('#fee').val("");
    $('#discount').val("");
    $('#total').val("");
    clearValidation();
}