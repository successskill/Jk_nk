function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




function createAccount() {
    const formData = new FormData();
    const deleteAccount = true;
    formData.append("delete", deleteAccount);

    fetch("/dashboard/", {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "/register/";
            } else {
                alert("Something went wrong.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Something went wrong.");
        });
};

function reSubmit() {
    document.getElementById('body').classList.add('d-none')
    document.getElementById('resubmit').classList.remove('d-none');
}