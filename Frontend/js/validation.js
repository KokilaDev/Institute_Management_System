// Regex patterns
const patterns = {
    studentId: /^NGIT-STU-\d{2}-\d{3}$/,
    lecturerId: /^NGIT-LEC-\d{2}-\d{3}$/,
    name: /^[A-Za-z ]{3,}$/,
    address: /^[A-Za-z0-9,\/ ]{5,}$/,
    contact: /^0\d{9}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    fee: /^\d+(\.\d{1,2})?$/,
    amount: /^\d+(\.\d{1,2})?$/,
};

// Validate single field
function validateField(element, regex) {
    let value = element.val().trim(); // trim spaces
    if (regex.test(value)) {
        element.removeClass("is-invalid").addClass("is-valid");
        return true;
    } else {
        element.removeClass("is-valid").addClass("is-invalid");
        return false;
    }
}

// Validate form
function validateForm(rules) {
    let isAllValid = true;
    for (let rule of rules) {
        if (!validateField(rule.element, rule.regex)) {
            isAllValid = false;
        }
    }
    return isAllValid;
}

// Clear validation
function clearValidation(selector = ".form-control") {
    $(selector).removeClass("is-invalid is-valid");
}
