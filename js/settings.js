const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(loggedInUser){

    document.getElementById("profileName").value =
        loggedInUser.name;

    document.getElementById("profileEmail").value =
        loggedInUser.email;

}
const themeSelect = document.getElementById("themeSelect");


const currentTheme = localStorage.getItem("theme");

if(currentTheme){
    themeSelect.value = currentTheme;
}


const nameInput = document.getElementById("profileName");
const emailInput = document.getElementById("profileEmail");
const saveBtn = document.querySelector(".save-btn");

// Load saved theme




// Load profile data




// Theme change

themeSelect.addEventListener("change", function(){

    if(this.value === "light"){

        document.body.classList.add("light-mode");
        localStorage.setItem("theme","light");

    }
    else{

        document.body.classList.remove("light-mode");
        localStorage.setItem("theme","dark");

    }
console.log("Theme saved:", localStorage.getItem("theme"));
addActivity("🎨 Theme changed");
});


// Save profile

saveBtn.addEventListener("click", () => {

    const oldUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const oldEmail = oldUser.email;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = {
        ...oldUser,
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    users = users.map(user =>
        user.email === oldEmail ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    showToast("✅ Profile updated successfully!");

});
