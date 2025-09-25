document.addEventListener("DOMContentLoaded", () => {
  let studentIdToDelete = null;

  // Delete button click
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      studentIdToDelete = this.getAttribute("data-id");
      let modal = new bootstrap.Modal(document.getElementById("deleteModal"));
      modal.show();
    });
  });

  // Confirm delete action
  document.getElementById("confirmDelete").addEventListener("click", function () {
    if (!studentIdToDelete) return;

    fetch("", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "student_id=" + studentIdToDelete
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          location.reload();
        } else {
          alert(data.message || "Error");
        }
      })
      .catch(() => alert("Something went wrong!"))
      .finally(() => {
        studentIdToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
      });
  });
});

// 🔑 Helper function: Get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}