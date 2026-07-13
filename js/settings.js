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

const savedName = localStorage.getItem("name");
const savedEmail = localStorage.getItem("email");


if(savedName){
    nameInput.value = savedName;
}


if(savedEmail){
    emailInput.value = savedEmail;
}


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

saveBtn.addEventListener("click", function(){

    localStorage.setItem("name", nameInput.value);
    localStorage.setItem("email", emailInput.value);


    alert("Profile saved successfully!");

});
