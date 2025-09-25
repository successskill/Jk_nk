function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

// Create Student
function Register() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value; 
    if (!otp) {
        document.getElementById('otp').focus();
        document.getElementsByClassName('alert')[0].innerText = "Please enter OTP!";
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
    formData.append("otp", otp);
    document.getElementById('regBtn').classList.add('d-none');
    document.getElementById('sregBtn').classList.remove('d-none');
    fetch("/", {
        method: "POST",
        headers: { "X-CSRFToken": getCSRFToken() },
        body: formData  
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message);
            window.location.href = "/login/";
        } else {

            document.getElementsByClassName('alert')[0].innerText = data.message || "Registration failed.";
            document.getElementsByClassName('alert')[0].classList.remove('alert-success');
            document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');   
            document.getElementById('otp').focus();
            document.getElementById('regBtn').classList.remove('d-none');
            document.getElementById('sregBtn').classList.add('d-none');
        }
    })
    .catch(err => {

        console.error(err);
        document.getElementsByClassName('alert')[0].innerText = "Something went wrong.";
        document.getElementsByClassName('alert')[0].classList.remove('alert-success');
        document.getElementsByClassName('alert')[0].classList.toggle('alert-danger');
        document.getElementById('regBtn').classList.remove('d-none');
        document.getElementById('sregBtn').classList.add('d-none');
    }
    );
}
// Send OTP


// Add Student by ID
document.getElementById("studentIdForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("/add-student/", {
        method: "POST",
        headers: { "X-CSRFToken": getCSRFToken() },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => console.error(err));
});