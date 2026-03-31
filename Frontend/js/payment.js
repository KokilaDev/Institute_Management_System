import { enrollCourses } from './enrollment.js';

$(document).ready(function () {
    loadPaymentData();
});

function validate() {
    const rules = [
        { element: $('#studentId'), regex: patterns.studentId },
        { element: $('#studentName'), regex: patterns.name }
    ];
    return validateForm(rules);
}

function loadPaymentData(){
    $('#studentId').val(sessionStorage.getItem("payStudentId"));
    $('#studentName').val(sessionStorage.getItem("payStudentName"));
    $('#courseName').val(sessionStorage.getItem("payCourseName"));
    $('#fee').val(sessionStorage.getItem("payFee"));
    $('#paymentDate').text(sessionStorage.getItem("payDate"));
}

$("#paymentType").change(function() {
    let paymentType = $(this).val();
    if (paymentType === "card") {
        $("#discount").val(10);
    } else if (paymentType === "online") {
        $("#discount").val(5);
    } else {
        $("#discount").val(0);
    }
    calculateTotal();
});

$('#discount').on('input', function() {
    calculateTotal();
});

function calculateTotal() {
    let fee = parseFloat($('#fee').val()) || 0;
    let discount = parseFloat($('#discount').val()) || 0;

    let discountAmount = (fee * discount) / 100;
    let total = fee - discountAmount;

    $('#total').val(total.toFixed(2));
}

$('#pay_btn').click(function () {
    savePayment();
})

function savePayment() {
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

    let studentId = $('#studentId').val();
    let studentName = $('#studentName').val();
    let courseName = $('#courseName').val();
    let courseFee = $('#fee').val();
    let paymentType = $('#paymentType').val();
    let discount = $('#discount').val();
    let total = $('#total').val();
    let date = $('#paymentDate').text();

    let payment = {
        studentId: studentId,
        studentName: studentName,
        courseName: courseName,
        courseFee: courseFee,
        paymentType: paymentType,
        discount: discount,
        totalAmount: total,
        paymentDate:date
    }

    if (!paymentType) {
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
        url: "http://localhost:8080/api/v1/payment/pay",
        method: "POST",
        data: JSON.stringify(payment),
        contentType: "application/json",
        success: function (response) {
            console.log(response);

            let enrollment = {
                studentId: studentId,
                studentName: studentName,
                courseName: courseName,
                fee: courseFee,
                enrollDate: date
            }
            enrollCourses(enrollment);

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Payment successful!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                Swal.fire({
                    title: "Do you want to print the receipt?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Print it!',
                    cancelButtonText: 'No',
                    focusCancel: true,
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        printReceipt(payment);
                        Swal.fire({
                            icon: 'success',
                            title: 'Receipt printed!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            });

            clearFields();
        },
        error: function (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Payment failed!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })
}

function clearFields() {
    $('#studentId').val("");
    $('#studentName').val("");
    $('#courseName').val("");
    $('#fee').val("");
    $('#paymentType').val("");
    $('#discount').val("");
    $('#total').val("");
    clearValidation();
}

function printReceipt(payment) {
    const receiptHTML = `
        <html>
        <head>
            <title>Receipt</title>
            <link rel="stylesheet" href="../../css/receipt.css">
        </head>
        <body>
        <div class="receipt">
            <div class="header">
                <div class="logo-container">
                    <img src="../../assets/logo.png" class="logo-img">
                    <div class="logo-text">NextGen IT Institute</div>
                    <p>Colombo, Sri Lanka</p>
                </div>
            </div>
            <h3 style="text-align:center;">Payment Receipt</h3>
            <p><strong>Student ID: </strong> ${payment.studentId}</p>
            <p><strong>Student Name: </strong> ${payment.studentName}</p>
            <p><strong>Course: </strong> ${payment.courseName}</p>
            <table>
                <tr>
                    <th>Fee</th>
                    <th>Discount</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>${payment.courseFee}</td>
                    <td>${payment.discount}%</td>
                    <td>${payment.totalAmount}</td>
                </tr>
            </table>
            <div class="footer">
                Thank you for your payment
            </div>
        </div>
        </body>
        </html>
    `;

    const newWin = window.open('', '_blank');
    newWin.document.write(receiptHTML);
    newWin.document.close();
    newWin.print();
}