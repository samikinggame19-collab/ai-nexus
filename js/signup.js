const form = document.querySelector("form");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(user => user.email === email);

    if (exists) {
        showToast("Email already exists.");
        return;
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";

});
document.querySelectorAll(".toggle-password").forEach(icon => {

    icon.addEventListener("click", () => {

        const input = document.getElementById(icon.dataset.target);

        if(input.type === "password"){

            input.type = "text";

            icon.classList.replace("fa-eye","fa-eye-slash");

        }else{

            input.type = "password";

            icon.classList.replace("fa-eye-slash","fa-eye");

        }

    });

});
const password = document.getElementById("password");

const fill = document.getElementById("strengthFill");

const text = document.getElementById("strengthText");

password.addEventListener("input", ()=>{

    const value = password.value;

    let score = 0;

    if(value.length >= 8) score++;

    if(/[A-Z]/.test(value)) score++;

    if(/[0-9]/.test(value)) score++;

    if(/[!@#$%^&*]/.test(value)) score++;

    switch(score){

        case 0:
        case 1:
            fill.style.width="25%";
            fill.style.background="#ef4444";
            text.innerText="Weak";
            break;

        case 2:
            fill.style.width="50%";
            fill.style.background="#f59e0b";
            text.innerText="Medium";
            break;

        case 3:
            fill.style.width="75%";
            fill.style.background="#22c55e";
            text.innerText="Strong";
            break;

        case 4:
            fill.style.width="100%";
            fill.style.background="#10b981";
            text.innerText="Very Strong";
            break;

        default:
            fill.style.width="0%";
            text.innerText="Password strength";
    }

});

