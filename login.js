function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

function showMessage(message, type) {
    const alertBox = document.getElementsByClassName('alert')[0];
    alertBox.innerText = message;
    alertBox.classList.remove('alert-danger', 'alert-success');
    if (type === "success") {
        alertBox.classList.add('alert-success');
    } else {
        alertBox.classList.add('alert-danger');
    }
}

function SendLoginOtp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage("Please enter username and password!", "error");
        return;
    }

    document.getElementById('sotpBtn').classList.remove('d-none');
    document.getElementById('otpBtn').classList.add('d-none');

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch(window.location.href, {
        method: "POST",
        headers: { "X-CSRFToken": getCSRFToken() },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage(data.message || "OTP sent to your email!", "success");

                document.getElementById("username").setAttribute("readonly", true);
                document.getElementById("password").setAttribute("readonly", true);

                document.getElementById('sotpBtn').classList.add('d-none');
                document.getElementById('otpInput').classList.remove('d-none');
                document.getElementById('loginBtn').classList.remove('d-none');
            } else {
                document.getElementById('sotpBtn').classList.add('d-none');
                document.getElementById('otpBtn').classList.remove('d-none');
                showMessage(data.message || "Failed to send OTP.", "error");
            }
        })
        .catch(error => {
            document.getElementById('sotpBtn').classList.add('d-none');
            document.getElementById('otpBtn').classList.remove('d-none');
            showMessage("Failed to send OTP.", "error");
        });
}

function Login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const otp = document.getElementById('otp').value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("otp", otp);

    fetch(window.location.href, {
        method: "POST",
        headers: { "X-CSRFToken": getCSRFToken() },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage(data.message || "Login successful!", "success");
                window.location.href = "/dashboard/";
            } else {
                showMessage(data.message || "Invalid OTP!", "error");
                document.getElementById('otp').focus();
            }
        })
        .catch(error => {
            console.error(error);
            showMessage("Something went wrong.", "error");
            document.getElementById('otp').focus();
        });
}
