$(document).ready(function(){

    const registerBtn = $('#registerBtn');
    const loginBtn = $('#loginBtn');
    const mobileRegisterBtn = $('#mobileRegisterBtn');
    const mobileLoginBtn = $('#mobileLoginBtn');
    const authWrapper = $('#authWrapper');

    if (registerBtn.length) {
        registerBtn.click(function () {
            authWrapper.addClass("panel-active");
        });
    }

    if (loginBtn.length) {
        loginBtn.click(function () {
            authWrapper.removeClass("panel-active");
        });
    }

    if (mobileRegisterBtn.length) {
        mobileRegisterBtn.click(function () {
            authWrapper.addClass("panel-active");
        });
    }

    if (mobileLoginBtn.length) {
        mobileLoginBtn.click(function () {
            authWrapper.removeClass("panel-active");
        });
    }

});

$('#signin').click(function () {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signin",
        method: 'POST',
        contentType: 'application/json',
        data:JSON.stringify({
            username: username,
            password: password
        }),
        success: function(response) {
            let role = (response.data?.role || response.role)?.trim().toUpperCase();
            console.log("ROLE:", role);
            localStorage.setItem('token', response.accessToken);
            alert("Successfully signed-in");
            if (role === "ADMIN") {
                window.location.href = "../pages/dashboards/admin-dashboard.html";
            } else if (role === "LECTURER") {
                window.location.href = "../pages/dashboards/lecturer-dashboard.html";
            } else if (role === "USER") {
                window.location.href = "../pages/dashboards/user-dashboard.html";
            } else {
                window.location.href = "../pages/dashboards/student-dashboard.html";
            }
        },
        error:function (error) {
            console.log(error)
            alert("Login failed!");
        }
    })
});

$('#signup').click(function () {
    let code = $('#code').val();
    let username = $('#newUsername').val();
    let password = $('#newPassword').val();

    $.ajax({
        url:'http://localhost:8080/api/v1/auth/signup',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
            username: username,
            password: password,
            code: code
        }),
        success: function(response) {
            let role = (response.data?.role || "").trim().toUpperCase();
            console.log("ROLE:", role);
            localStorage.setItem('token', response.data?.accessToken);
            alert("Signup Successful!");
            if (role === "ADMIN") {
                window.location.href = "../pages/dashboards/admin-dashboard.html";
            } else if (role === "LECTURER") {
                window.location.href = "../pages/dashboards/lecturer-dashboard.html";
            } else if (role === "USER") {
                window.location.href = "../pages/dashboards/user-dashboard.html";
            } else {
                window.location.href = "../pages/dashboards/student-dashboard.html";
            }
        },
        error:function (error) {
            console.log(error)
            alert(error.responseJSON?.message || "Signup failed!");
        }
    })
});