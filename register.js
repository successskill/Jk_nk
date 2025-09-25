function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

function SendOtp() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmPassword').value;

    if (!email) {
        document.getElementById('email').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please enter email!";
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }

    if (!role || role === "Choose your role") {
        document.getElementById('role').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please select role!";
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }
    if (!username) {
        document.getElementById('username').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please enter username!";       
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }

    if (!password) {
        document.getElementById('password').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please enter password!";
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }
    if (!confirmpassword) {
        document.getElementById('confirmPassword').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please enter confirm password!";
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }
    if (password !== confirmpassword) {
        document.getElementById('confirmPassword').focus();
        document.getElementsByClassName('alert')[0].innerText = "Password and Confirm Password do not match!";
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        return;
    }   
    document.getElementsByClassName('alert')[0].innerText = "";
    document.getElementsByClassName('alert')[0].classList.remove('alert-danger');
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    document.getElementById('otpBtn').classList.add('d-none');
    document.getElementById('sotpBtn').classList.remove('d-none');

    fetch(window.location.href, {
        method: "POST",
        headers: {
            "X-CSRFToken": getCSRFToken()
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementsByClassName('alert')[0].innerText = data.message || "OTP sent to your email.";
                document.getElementsByClassName('alert')[0].classList.toggle('alert-success');
                document.getElementById("username").setAttribute("readonly", true);
                document.getElementById("email").setAttribute("readonly", true);
                document.getElementById("role").setAttribute("readonly", true);
                document.getElementById("password").setAttribute("readonly", true);
                document.getElementById("confirmPassword").setAttribute("readonly", true);

                document.getElementById('sotpBtn').classList.add('d-none');
                document.getElementById('otpInput').classList.remove('d-none');
                document.getElementById('regBtn').classList.remove('d-none');
            } else {
                document.getElementById('sotpBtn').classList.add('d-none');
                document.getElementById('otpBtn').classList.remove('d-none');
                document.getElementsByClassName('alert')[0].innerText = data.message || "Failed to send OTP.";
                document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
            }
        })
        .catch(error => {
            document.getElementById('sotpBtn').classList.add('d-none');
            document.getElementById('otpBtn').classList.remove('d-none');
            console.error(error);
            document.getElementsByClassName('alert')[0].innerText = "Something went wrong.";
            document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        });
}

function Register() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("otp", otp);

    fetch(window.location.href, {
        method: "POST",
        headers: {
            "X-CSRFToken": getCSRFToken()
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
document.getElementsByClassName('alert')[0].innerText = data.message || "Registration successful!";
document.getElementsByClassName('alert')[0].classList.remove('alert-danger');
document.getElementsByClassName('alert')[0].classList.toggle('alert-success');
                window.location.href = "/dashboard/";
            } else {
                document.getElementsByClassName('alert')[0].innerText = data.message || "Registration failed.";
                document.getElementsByClassName('alert')[0].classList.remove('alert-success');
                document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
                
                document.getElementById('otp').focus();}
        })
        .catch(error => {
            console.error(error);
            document.getElementsByClassName('alert')[0].innerText = "Something went wrong.";
            document.getElementsByClassName('alert')[0].classList.remove('alert-success');
            document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
            
            document.getElementById('otp').focus();
        });
}