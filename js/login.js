const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;
    const remember = document.querySelector('input[type="checkbox"]').checked;

    const users = JSON.parse(localStorage.getItem("users")) || [];

console.log("Email entered:", email);
console.log("Password entered:", password);
console.log("Users:", users);

    const user = users.find(u =>
        u.email === email &&
        u.password === password
    );

console.log("Matched user:", user);

    if(!user){
        showToast("❌ Invalid email or password.");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
localStorage.setItem("loggedIn", "true");
    if(remember){
        localStorage.setItem("rememberEmail", email);
    }else{
        localStorage.removeItem("rememberEmail");
    }

    window.location.href = "dashboard.html";

});
const savedEmail = localStorage.getItem("rememberEmail");

if(savedEmail){
    document.querySelector('input[type="email"]').value = savedEmail;
    document.querySelector('input[type="checkbox"]').checked = true;
}
