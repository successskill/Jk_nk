document.addEventListener("DOMContentLoaded", function () {
    const genderSelect = document.getElementById("gender");
    const avatarBtn = document.getElementById("avatarBtn");
    const avatarList = document.getElementById("avatarList");
    const avatarPreview = document.getElementById("avatarPreview");
    const selectedAvatar = document.getElementById("selectedAvatar");

    genderSelect.addEventListener("change", function () {
      avatarBtn.style.display = "inline-block";

      avatarList.innerHTML = "";
      avatarPreview.innerHTML = "";
      selectedAvatar.value = "";

      // Selected gender
      const gender = this.value;

      for (let i = 1; i <= 6; i++) {
        let imgSrc = "";

        if (gender === "Male") {
          imgSrc = "/static/img/avatars/male/" + i + ".png";
        } else if (gender === "Female") {
          imgSrc = "/static/img/avatars/female/" + i + ".png";
        } else {
          alert("Please select a valid option.")
        }

        avatarList.innerHTML += `
          <img src="${imgSrc}" 
               alt="${gender} Avatar ${i}" 
               class="rounded-circle border avatar-img"
               width="80" height="80"
               style="cursor:pointer"
               onclick="selectAvatar('${gender.toLowerCase()}/${i}.png', this)">
        `;
      }
    });
  });

  // Avatar select function
  function selectAvatar(value, element) {
    document.getElementById("selectedAvatar").value = value;
    document.getElementById("avatarPreview").innerHTML =
      '<img src="' + element.src + '" class="rounded-circle border border-primary" width="80" height="80">';
  }